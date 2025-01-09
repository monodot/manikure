import {type ClassValue, clsx} from 'clsx'
import {twMerge} from 'tailwind-merge'
import type {Resource} from "@/types/resource.ts";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function generateId(resources: Resource[]) {
    const nextId = resources.reduce((max, resource) => Math.max(max, resource.id ?? 0), 0) + 1;
    return nextId;
}

export function cleanupEmptyValues(obj: any): any {
    if (obj === null || obj === undefined) {
        return undefined;
    }

    if (Array.isArray(obj)) {
        const filtered = obj
            .map(item => cleanupEmptyValues(item))
            .filter(item => item !== undefined);
        return filtered.length > 0 ? filtered : undefined;
    }

    if (typeof obj === 'object') {
        const cleaned: any = {};
        let hasNonEmptyValues = false;

        for (const [key, value] of Object.entries(obj)) {
            const cleanedValue = cleanupEmptyValues(value);
            if (cleanedValue !== undefined) {
                cleaned[key] = cleanedValue;
                hasNonEmptyValues = true;
            }
        }

        return hasNonEmptyValues ? cleaned : undefined;
    }

    return obj;
}
