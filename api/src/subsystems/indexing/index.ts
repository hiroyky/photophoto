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
const mongoDb = new MongoDBDriver();
const service = new PhotoStorageService(
    new PhotoFileRepository(mongoDb),
    new PhotoMetadataRepository(mongoDb),
);

async function validOptions(options: CommandLineOptions): Promise<boolean> {
    if (!options.in || options.in.length === 0) {
        throw new Error('--in is not specified.');
    }
    return true;
}

async function mainProcess(basePaths: string[]) {
    const paths = basePaths.map(p => path.isAbsolute(p) ? p : path.resolve(__dirname, p));

    for (const p of paths) {
        if ((await fs.stat(p)).isDirectory()) {
            const contents = await fs.readdir(p);
            await mainProcess(contents.map(c => path.resolve(p, c)));
            continue;
        }

        if (!isImageFile(p)) {
            continue;
        }

        try {
            await service.upsertIndex(p, new Date());
            console.log('processed', p);
        } catch(err) {
            console.error(p, err);
        }
    }
}

function isImageFile(p: string) {
    const ext = path.extname(p);
    return !!SupportedExtensions.find(v => v === ext.toUpperCase());
}

const options = commandLineArgs(cmdOptionDef);
validOptions(options);
mongoDb.init().then(async () => {
    try {
        await mainProcess(options.in);
    } catch(err) {
        console.error(err);
    } finally {
        mongoDb.close();
    }

});
