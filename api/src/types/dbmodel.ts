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
    id: string | number;
}
export interface CollectionBase {
    _id?: any;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface PhotoFile extends Node {
    id: number;
    filePath: string;
    fileSize: number;
    fileName: string;
    fileType: string;
    fileHash: string;
}

export interface PhotoMetadata extends Node {
    id: number;
    [key:string]: any;
}
