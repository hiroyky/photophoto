import * as db from '~/types/dbmodel';
import * as gql from '~/types/gqlmodel-generated';
import {Connection, Pagination} from '~/types/graphql-relay';

export function NewConnection<T>(nodes: T[], arg: Pagination): Connection<T> {


    return {
        pageInfo: {
            hasNextPage: true,
            hasPreviousPage:true,
            startCursor: '',
            endCursor: '',
        },
        edges: [],
        nodes,
    };
}

export function NewPhotoFile(photoFile:db.PhotoFile): gql.PhotoFile {
    return {
        id: 'UGhvdGZpbGVpZDoxCg==',
        filePath: photoFile.filePath,
        fileType: photoFile.fileType,
        fileSize: photoFile.fileSize,
        fileName: photoFile.fileName,
        fileHash: photoFile.fileHash,
        metadata: null,
    };
}

export function NewPhotoMetgadata(metadata: db.PhotoMetadata): gql.PhotoMetadata {
    return {
        id: 'metadataid',
    };
}
