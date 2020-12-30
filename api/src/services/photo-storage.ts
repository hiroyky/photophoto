import PhotoMetadataRepository from '~/repositories/photo-metadata';
import PhotoFileRepository from '~/repositories/photo-file';
import {abstractPhotoFile, parseExif} from '~/services/photo-parse';

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


        // 画像ファイルの保存
        const photoFile = await abstractPhotoFile(filePath);
        const photoMetadata = await parseExif(filePath);


        if (!await this.photoFileRepo.exists(photoFile.id)) {
            await this.photoFileRepo.insertOne(photoFile, now);
        } else {
            await this.photoFileRepo.replaceOne(photoFile, now);
        }

        if (!await this.photoMetadataRepo.exists(photoMetadata.id)) {
            await this.photoMetadataRepo.insertOne(photoMetadata, now);
        } else {
            await this.photoMetadataRepo.replaceOne(photoMetadata, now);
        }
    }

}
