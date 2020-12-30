export interface Pagination {
    first?: number;
    after?: string;
    last?: number;
    before?: number;
}

export interface Connection<T> {
    pageInfo: {
        hasNextPage: boolean,
        hasPreviousPage: boolean,
        startCursor?: string,
        endCursor?: string,
    },
    edges: {
        cursor: string,
        node: T,
    }[],
    nodes: T[],
}
