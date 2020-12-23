import commandLineArgs, { CommandLineOptions, OptionDefinition } from 'command-line-args';
import { promises as fs, constants } from 'fs';
import path from 'path';
import MongoDBDriver from '~/drivers/mongodb';
import PhotoMetadataRepository from '~/repositories/photo-metadata';
import PhotoStorageService from '~/services/photo-storage';
import PhotoFileRepository from '~/repositories/photo-file';
import {SupportedExtensions} from '~/config/constants';

const cmdOptionDef: OptionDefinition[] = [
    { name:'in', alias:'i', type: String, defaultOption: true, multiple: true }
];

async function validOptions(options: CommandLineOptions): Promise<boolean> {
    if (!options.in || options.in.length === 0) {
        throw new Error('--in is not specified.');
    }
    return true;
}

async function mainProcess(basePaths: string[]) {
    const mongoDb = new MongoDBDriver();
    const service = new PhotoStorageService(
        new PhotoFileRepository(mongoDb),
        new PhotoMetadataRepository(mongoDb),
    );
    await mongoDb.init();

    const paths = basePaths.map(p => path.isAbsolute(p) ? p : path.resolve(__dirname, p));
    await Promise.all(paths.map(p => fs.access(p)));

    await Promise.all(paths.map(async p => {
        if ((await fs.stat(p)).isDirectory()) {
            mainProcess((await fs.readdir(p)).filter(isImageFile));
            return;
        }

        if (!isImageFile(p)) {
            return;
        }

        try {
            await service.upsertIndex(p, new Date());
            console.log('processed', p);
        } catch(err) {
            console.error(p, err);
        }
    }));

    mongoDb.close();
}

function isImageFile(p: string) {
    const ext = path.extname(p);
    return !!SupportedExtensions.find(v => v === ext.toUpperCase());
}

const options = commandLineArgs(cmdOptionDef);
validOptions(options);
mainProcess(options.in);
