import PhotoMetadataRepository from '~/repositories/photo-metadata';
import { promises as fs } from 'fs';
import * as path from 'path';
import exifr from 'exifr';
import md5 from 'md5';
import {PhotoFile, PhotoMetadata} from '~/types/dbmodel';
import PhotoFileRepository from '~/repositories/photo-file';

export default class PhotoStorageService {
    constructor(
        private photoFileRepo: PhotoFileRepository,
        private photoMetadataRepo: PhotoMetadataRepository
    ) {
    }

    async upsertIndex(filePath: string, now: Date) {
        // サムネイルを作る
        // TODO

        // RAW画像の場合は、サムネの抽出、JPEG版も作る
        // ただし、同一ファイル名のJPEGがあるかも確認

        const stat = await fs.stat(filePath);
        const buf = await fs.readFile(filePath);

        // 画像ファイルの保存
        const id = md5(filePath);
        const photoFile: PhotoFile = {
            id,
            filePath,
            fileName: path.basename(filePath),
            fileType: path.extname(filePath),
            fileSize: stat.size,
            fileHash: md5(buf),
        };

        const exif = await exifr.parse(filePath);
        const photoMetadata: PhotoMetadata = {
            id,
            ...exif
        };

        if (!await this.photoFileRepo.exists(id)) {
            await this.photoFileRepo.insertOne(photoFile, now);
        } else {
            await this.photoFileRepo.replaceOne(photoFile, now);
        }

        if (!await this.photoMetadataRepo.exists(id)) {
            await this.photoMetadataRepo.insertOne(photoMetadata, now);
        } else {
            await this.photoMetadataRepo.replaceOne(photoMetadata, now);
        }
    }

}
