import {PhotoFile, PhotoMetadata, QueryResolvers, Resolvers} from '~/types/gqlmodel-generated';
import PhotoFileRepository from '~/repositories/photo-file';
import MongoDBDriver from '~/drivers/mongodb';
import * as gql from '~/types/gqlmodel-generated';
import PhotoMetadataRepository from '~/repositories/photo-metadata';
import {NewPhotoFile, NewPhotoMetgadata} from '~/presentation/presentation';

const mongoDb = new MongoDBDriver();
const photoFileRepo = new PhotoFileRepository(mongoDb);
const photoMetadataRepo = new PhotoMetadataRepository(mongoDb);

const query: QueryResolvers = {
    photoFile: async (_parent, args, _context, _info) => {
        await mongoDb.init();
        const photoFile = await photoFileRepo.findOneById(args.id);
        return photoFile ? NewPhotoFile(photoFile) : null;
    },
    photoFiles: async (_parent, args, _context, _info) => {
        await mongoDb.init();
        const { items } = await photoFileRepo.find({}, {});
        const nodes = items.map(NewPhotoFile);

        return {
            pageInfo: {
                hasNextPage: false,
                hasPreviousPage: false,
            },
            edges: [],
            nodes,
        };
    }
};

const resolvers: Resolvers = {
    Query: query,
    PhotoFile: {
        async metadata(parent, args, context, info) {
            await mongoDb.init();
            const metadata = await photoMetadataRepo.findOneById(parent.id);
            return metadata ? NewPhotoMetgadata(metadata) : null;
        }
    }
};

export default resolvers;
