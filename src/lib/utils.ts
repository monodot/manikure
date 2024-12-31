import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type {Resource} from "@/types/resource.ts";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateId(resources: Resource[]) {
  const maxId = resources.reduce((max, resource) => Math.max(max, resource.id ?? 0), 0);
  return maxId + 1;
}
