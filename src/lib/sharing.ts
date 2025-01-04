import { type Resource } from '@/types/resource';
import pako from 'pako';

// URL-safe base64 encoding/decoding
function base64UrlEncode(buffer: Uint8Array): string {
    const str = btoa(
        buffer.reduce((data, byte) => data + String.fromCharCode(byte), '')
    );
    return str
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}

function base64UrlDecode(str: string): Uint8Array {
    // Add removed padding
    str = str.replace(/-/g, '+').replace(/_/g, '/');
    while (str.length % 4) {
        str += '=';
    }

    const binaryStr = atob(str);
    const bytes = new Uint8Array(binaryStr.length);
    for (let i = 0; i < binaryStr.length; i++) {
        bytes[i] = binaryStr.charCodeAt(i);
    }
    return bytes;
}

interface ValidationError {
    message: string;
    resource?: Partial<Resource>;
    index?: number;
}

function validateResource(resource: any, index: number): ValidationError | null {
    if (!resource.apiVersion) {
        return { message: 'Missing apiVersion', resource, index };
    }
    if (!resource.kind) {
        return { message: 'Missing kind', resource, index };
    }
    if (!resource.metadata?.name) {
        return { message: 'Missing metadata.name', resource, index };
    }
    return null;
}

export function encodeResources(resources: Resource[]): string {
    try {
        // Remove IDs and clean up the resources
        const cleanResources = resources.map(({ id, ...rest }) =>
            JSON.parse(JSON.stringify(rest))
        );

        // Convert to JSON, compress with Pako, and encode as base64url
        const jsonString = JSON.stringify(cleanResources);
        const compressed = pako.deflate(jsonString, { level: 9 }); // Maximum compression
        return base64UrlEncode(compressed);
    } catch (e) {
        console.error('Failed to encode resources:', e);
        throw e;
    }
}

export function decodeResources(param: string): {
    resources: Resource[];
    errors: ValidationError[];
} {
    const errors: ValidationError[] = [];
    let decoded: any[] = [];

    try {
        // Decode base64url string and decompress
        const compressed = base64UrlDecode(param);
        const decompressed = pako.inflate(compressed);
        const jsonString = new TextDecoder().decode(decompressed);
        const parsed = JSON.parse(jsonString);

        if (!Array.isArray(parsed)) {
            throw new Error('Invalid format: expected an array');
        }

        // Validate each resource
        decoded = parsed.filter((resource, index) => {
            const error = validateResource(resource, index);
            if (error) {
                errors.push(error);
                return false;
            }
            return true;
        });

        if (decoded.length === 0 && errors.length === 0) {
            errors.push({ message: 'No valid resources found in shared data' });
        }

    } catch (e) {
        errors.push({
            message: e instanceof Error ? e.message : 'Failed to decode resources'
        });
        console.error('Failed to decode:', e);
        decoded = [];
    }

    return {
        resources: decoded,
        errors
    };
}

// Most browsers support at least 2000 characters
const MAX_URL_LENGTH = 2000;

export function checkUrlLength(
    baseUrl: string,
    encoded: string
): { valid: boolean; estimatedLength: number } {
    const estimatedLength = `${baseUrl}?resources=${encoded}`.length;
    return {
        valid: estimatedLength <= MAX_URL_LENGTH,
        estimatedLength
    };
}