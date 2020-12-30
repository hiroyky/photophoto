import {FindOption, FindQuery, FindResult, PhotoFile} from '~/types/dbmodel';
import MongoDBDriver from '~/drivers/mongodb';
import {Collection} from 'mongodb';
import MongoDbRepository from '.';
import {decodeGraphqlId} from '~/util/graphql';

const collectionName = 'photoFile';

export default class PhotoFileRepository extends MongoDbRepository<PhotoFile> {
    constructor(private driver: MongoDBDriver) {
        super();
    }

    protected get collection(): Collection<PhotoFile> {
        return this.driver.getCollection<PhotoFile>(collectionName);
    }

    findOneById(id: string): Promise<PhotoFile | null> {
        const _id = decodeGraphqlId(id);
        return this.collection.findOne({_id});
    }

    async findOneByFilePath(filePath: string): Promise<PhotoFile | null> {
        const result = await this.find({filePath});
        return result.items.length > 0 ? result.items[0] : null;
    }

    async find(query: FindQuery, option?: FindOption): Promise<FindResult<PhotoFile>> {
        const { limit, skip } = PhotoFileRepository.createFindOption<PhotoFile>(option);
        const cursor = this.collection.find<PhotoFile>(query, {limit, skip});
        const totalCount = await cursor.count();
        const items =  await cursor.toArray();

        return PhotoFileRepository.createFindResult(items, skip, limit, totalCount);
    }

    async insertOne(val: PhotoFile, now: Date): Promise<void> {
        const document = PhotoFileRepository.encodeDatabaseDocument(val);
        document.createdAt = now;
        document.updatedAt = now;
        await this.collection.insertOne(document);
    }

    async replaceOne(val: PhotoFile, now: Date): Promise<void> {
        const document = PhotoFileRepository.encodeDatabaseDocument(val);
        document.updatedAt = now;
        await this.collection.replaceOne(
            {_id: document._id},
            document,
            { upsert: false }
        );
    }
}
