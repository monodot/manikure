import type {Resource} from "@/types/resource.ts";
import {toast} from "@/components/ui/toast";
import {resources as defaultResources} from "@/templates/default"; // Load an initial/default set of resources

const STORAGE_KEY = "manikure-resources";

export const saveProject = (resources: Resource[]) => {
    try {
        const serialized = JSON.stringify(resources);
        localStorage.setItem(STORAGE_KEY, serialized);
    } catch (err) {
        console.error("Failed to save state", err);
        toast({
            variant: "destructive",
            description: "Failed to save your changes locally. Local storage might be full or disabled.",
        });
    }
};

export const loadProject = (): Resource[] => {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : defaultResources;
    } catch (err) {
        console.error("Failed to load state", err);
        toast({
            variant: "destructive",
            description: "Failed to load your project from local storage. Using defaults instead.",
        });
        return defaultResources;
    }
}
