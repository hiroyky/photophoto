import { Db, MongoClient } from 'mongodb';
import * as env from '~/config/env';

export default class MongoDBDriver {
    private client: MongoClient
    private db: Db | null = null;

    constructor(
        hostname: string = env.MONGODB_HOSTNAME,
        private database: string = env.MONGODB_DATABASE
    ) {
        this.client = new MongoClient(
            hostname,
            {
                useUnifiedTopology:true
            }
        );
    }

    async  init() {
        if (!this.client.isConnected()) {
            await this.client.connect();
        }
        this.db = this.client.db(this.database);
    }

    getCollection<T>(collection: string) {
        if (this.db === null) {
            throw new Error('mongodb is not initialized.');
        }
        return this.db.collection<T>(collection);
    }

    close() {
        this.client.close();
    }
}
