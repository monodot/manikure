import type { Resource } from "@/types/resource.ts";
import { generateId } from "@/lib/utils";
import { decodeResources } from "@/lib/sharing";
import { toast } from "@/components/ui/toast";
import { saveProject } from "@/lib/store";

export const loadSharedResources = (): { resources: Resource[], selectedId: number | null } => {
    // Get the hash without the # symbol
    const hash = window.location.hash.slice(1);
    
    if (!hash) {
        return { resources: [], selectedId: null };
    }

    const { resources: decodedResources, errors } = decodeResources(hash);

    if (errors.length > 0) {
        toast({
            variant: "destructive",
            description: "Failed to load some shared resources. They may be invalid or corrupted.",
        });
        console.error('Share decode errors:', errors);
    }

    if (decodedResources.length > 0) {
        const resources = decodedResources.map(resource => ({
            id: generateId(decodedResources),
            ...resource
        }));
        
        // Save the shared resources
        saveProject(resources);

        toast({
            description: `Loaded ${decodedResources.length} shared resources!`,
        });

        return {
            resources,
            selectedId: resources[0]?.id || null
        };
    }

    return { resources: [], selectedId: null };
};
