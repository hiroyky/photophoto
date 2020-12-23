import {CollectionBase, FindOption, FindResult, Node} from '~/types/dbmodel';
import {decodeGraphqlId, encodeGraphQlId} from '~/util/graphql';
import {FindOneOptions} from '~/node_modules/@types/mongodb';

export default class MongoDbRepository<T extends Node> {
    protected static encodeDatabaseDocument<T extends {id?: string}>(obj: T): T & CollectionBase {
        if (!obj.id) {
            return Object.assign({}, obj);
        }

        const _id = decodeGraphqlId(obj.id);
        const dst = Object.assign({}, {_id}, obj);
        delete dst.id;
        return dst;
    }

    protected static decodeDatabaseDocument<T extends {id: string}>(name: string, obj: T & {_id?: string | number}): T {
        if (!obj._id) {
            throw new Error();
        }

        const id = encodeGraphQlId(name, obj._id);
        const dst = Object.assign({}, {id}, obj);
        delete dst._id;
        return dst;
    }

    protected static createFindOption<T>(option?: FindOption, defaultLimit=20, maxLimit=100): { skip: number, limit: number } {
        if (option === undefined) {
            return {
                limit: defaultLimit,
                skip: 0,
            };
        }

        let limit = defaultLimit;
        if (option && option.limit) {
            if (option.limit < 0) {
                limit = defaultLimit;
            } else if(option.limit > maxLimit) {
                limit = maxLimit;
            }
            limit = option.limit;
        }

        return {
            limit,
            skip: option && option.offset && option.offset > 0 ? option.offset : 0
        };
    }

    protected static createFindResult<T>(items: T[], skip: number, limit: number, totalCount: number): FindResult<T> {
        return {
            totalCount,
            items,
            hasPrevious: skip > 0,
            hasNext: skip + limit < totalCount,
        };
    }
}
