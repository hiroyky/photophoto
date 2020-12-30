import { encode, decode } from 'js-base64';

export function encodeGraphQlId(name: string, id: string | number): string {
    return encode(`${name}:${id}`);
}

export function decodeGraphqlId(src: string): string {
    const parts = decode(src).split(':');
    if (parts.length !== 2) {
        throw new Error(`ID: ${src} is invalid format/`);
    }
    return parts[1];
}
