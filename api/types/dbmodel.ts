export type FindQuery = {[key: string]: any}
export interface FindOption {
    limit?: number;
    offset?: number;
}
export interface FindResult<T> {
    items: T[];
    totalCount: number;
    hasNext: boolean;
    hasPrevious: boolean;
}
export  interface Node {
    __typeName: string;
    id: string;
}
export interface CollectionBase {
    _id?: any;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface PhotoFile extends Node {
    id: string;
    filePath: string;
    fileSize: number;
    fileName: string;
    fileType: string;
    fileHash: string;
}

export interface PhotoMetadata extends Node {
    __typeName: 'photoMetadata';
    id: string;
    [key:string]: any;
}
