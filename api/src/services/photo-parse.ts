import {PhotoFile, PhotoMetadata} from '~/types/dbmodel';
import exifr from 'exifr';
import camelcaseKeys from 'camelcase-keys';
import md5 from 'md5';
import {promises as fs} from 'fs';
import * as path from 'path';

function getPhotoFileId(filePath: string): string {
    return md5(filePath);
}

export async function abstractPhotoFile(filePath: string): Promise<PhotoFile> {
    const stat = await fs.stat(filePath);
    const buf = await fs.readFile(filePath);

    return  {
        id: getPhotoFileId(filePath),
        filePath,
        fileName: path.basename(filePath),
        fileType: path.extname(filePath),
        fileSize: stat.size,
        fileHash: md5(buf),
    };
}

export async function parseExif(filePath: string): Promise<PhotoMetadata> {
    const result = await exifr.parse(filePath);
    const exif = camelcaseKeys<{[key:string]: any}>(result);
    return {
        id: getPhotoFileId(filePath),
        ...exif,
    };
}
