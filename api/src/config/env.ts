import dotenv from 'dotenv';
dotenv.config();

export const PORT = getEnv('PORT');
export const MONGODB_HOSTNAME = getEnv('MONGODB_HOSTNAME');
export const MONGODB_DATABASE = getEnv('MONGODB_DATABASE');

function getEnv(name: string): string {
    const val = process.env[name];
    if (val === undefined) {
        throw new Error(`env: ${name} is not defined.`);
    }
    return val;
}
