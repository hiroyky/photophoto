import {FindOption, FindQuery, PhotoFile, PhotoMetadata} from '~/types/dbmodel';
import MongoDBDriver from '~/drivers/mongodb';
import MongoDbRepository from '.';
import {Collection} from '~/node_modules/@types/mongodb';
import {decodeGraphqlId} from '~/util/graphql';

const collectionName = 'photoMetadata';

export default class PhotoMetadataRepository extends MongoDbRepository<PhotoMetadata> {
    constructor(private driver: MongoDBDriver) {
        super();
    }

    protected get collection(): Collection<PhotoMetadata> {
        return this.driver.getCollection<PhotoMetadata>(collectionName);
    }

    findOneById(id: string): Promise<PhotoMetadata | null> {
        const _id = decodeGraphqlId(id);
        return this.collection.findOne({_id});
    }

    async find(query: FindQuery, option?: FindOption) {
        const { limit, skip } = PhotoMetadataRepository.createFindOption<PhotoMetadata>(option);
        const cursor = this.collection.find<PhotoMetadataRepository>(query, {limit, skip});
        const totalCount = await cursor.count();
        const items =  await cursor.toArray();

        return PhotoMetadataRepository.createFindResult(items, skip, limit, totalCount);
    }

    async insertOne(val: PhotoMetadata, now: Date): Promise<void> {
        const document = PhotoMetadataRepository.encodeDatabaseDocument(val);
        document.createdAt = now;
        document.updatedAt = now;
        await this.collection.insertOne(document);
    }

    async replaceOne(val: PhotoMetadata, now: Date): Promise<void> {
        const document = PhotoMetadataRepository.encodeDatabaseDocument(val);
        document.updatedAt = now;
        await this.collection.replaceOne(
            {_id: document._id},
            document,
            { upsert: false },
        );
    }

    async exists(_id: string): Promise<boolean> {
        const cur = this.collection.find({_id});
        return await cur.count() > 0;
    }
}
