<script setup lang="ts">
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {Toaster} from "@/components/ui/toast";
import {ResizableHandle, ResizablePanel, ResizablePanelGroup,} from '@/components/ui/resizable';
import {computed, onMounted, ref} from "vue";
import CodeViewer from "@/components/CodeViewer.vue";
import TemplateDialog from "@/components/TemplateDialog.vue";
import ImportDialog from "@/components/ImportDialog.vue";
import ResourcesList from "@/components/ResourcesList.vue";
import {useToast} from "@/components/ui/toast/use-toast";
import {Clipboard, ExternalLink} from "lucide-vue-next";
import {dump} from 'js-yaml';
import type {Resource} from "@/types/resource.ts";
import ResourceForm from "@/components/ResourceForm.vue";
import {generateId} from "@/lib/utils.ts";
import {resources as defaultResources} from "@/templates/default"; // Load an initial/default set of resources
import WelcomeDialog from "@/components/WelcomeDialog.vue";
import {decodeResources} from "@/lib/sharing.ts";
import ShareButton from "@/components/ShareButton.vue";
import {ScrollArea} from "@/components/ui/scroll-area";

const { toast } = useToast();

const resources = ref<Resource[]>(defaultResources);

const selectedResourceId = ref<number | null>(1);
const selectedResource = computed(() => {
  return resources.value.find((resource) => resource.id === selectedResourceId.value) || null;
})

const updateResource = (updatedResource: Resource) => {
  const plainResource = JSON.parse(JSON.stringify(updatedResource)); // Create a plain object copy without reactive wrapping
  const index = resources.value.findIndex((resource) => resource.id === plainResource.id);
  if (index !== -1) {
    resources.value[index] = plainResource;
    console.debug('Updated resource: ', plainResource);
  }
}

const removeResource = (id: number) => {
  const index = resources.value.findIndex(r => r.id === id);
  resources.value.splice(index, 1);
  if (selectedResourceId.value === id) {
    selectedResourceId.value = resources.value[0]?.id || null;
  }
};

const clearAll = () => {
  resources.value = [];
  selectedResourceId.value = resources.value[0].id || null; // Or null, because Resource type's ID field is nullable
};

const copyToClipboard = () => {
  const yamlDocs = resources.value.map(r => dump(r)).join('---\n');
  navigator.clipboard.writeText(yamlDocs);
  toast({
    description: "Resources copied to your clipboard!",
  });
};

const loadSharedResources = () => {
  const params = new URLSearchParams(window.location.search);
  const shared = params.get('resources');

  if (!shared) return;

  const { resources: decodedResources, errors } = decodeResources(shared);

  if (errors.length > 0) {
    toast({
      variant: "destructive",
      description: "Failed to load some shared resources. They may be invalid or corrupted.",
    });
    console.error('Share decode errors:', errors);
  }

  if (decodedResources.length > 0) {
    // TODO: Merge this with the code in "ImportDialog", because they basically do the same thing
    resources.value = []; // reset
    decodedResources.forEach(resource => {
      resources.value.push({
        id: generateId(resources.value),
        ...resource
      });
    })
    selectedResourceId.value = resources.value[0].id || null;

    toast({
      description: `Loaded ${decodedResources.length} shared resources!`,
    });
  }
};

onMounted(() => {
  loadSharedResources();
});

</script>

<template>
  <Toaster />
  <WelcomeDialog />
  <div class="flex flex-col h-screen">
    <header
      class="flex-none sticky top-0 z-10 flex justify-between h-[60px] items-center gap-1 border-b bg-background px-4"
    >
      <div class="flex items-center gap-2">
      <h1 class="text-xl font-semibold">
        Manikure Studio
      </h1>
      <Badge variant="secondary" class="text-xs">Preview</Badge>
      </div>

      <!-- Buttons -->
      <div class="flex gap-2 items-center">
        <ImportDialog @select="(template) => {
          template.forEach((resource, _index) => {
            resources.push({
              id: generateId(resources),
              ...resource,
            });
          });
        }" />
        <TemplateDialog @select="(template) => {
          template.forEach((resource, _index) => {
            resources.push({
              id: generateId(resources),
              ...resource,
            });
          });
        }" />

        <ShareButton
            :resources="resources"
        />

        <Button
            variant="default"
            size="sm"
            class="gap-1.5 text-sm"
            @click="copyToClipboard"
        >
          <Clipboard class="size-3.5" />
          Copy YAML
        </Button>

        <a href="https://github.com/monodot/manikure" class="text-sm font-medium px-2 flex items-center gap-1">
          <span>GitHub</span>
          <ExternalLink class="size-3" />
        </a>
      </div>
    </header>

    <main class="lg:flex lg:flex-1 min-h-0">

      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel :default-size="20">
          <ScrollArea class="h-full">
            <ResourcesList
                :resources="resources"
                :selectedResourceId="selectedResourceId"
                @select="selectedResourceId = $event"
                @remove-resource="removeResource"
                @clear-all="clearAll"
            />
          </ScrollArea>
        </ResizablePanel>

        <ResizableHandle />

        <ResizablePanel :default-size="40">
          <ScrollArea class="h-full">
            <ResourceForm
                v-if="selectedResource"
                :key="selectedResourceId || 0"
                :modelValue="selectedResource"
                @update:modelValue="updateResource"
            />
          </ScrollArea>
        </ResizablePanel>

        <ResizableHandle />

        <ResizablePanel :default-size="40">
          <ScrollArea class="h-full">
            <CodeViewer v-if="selectedResource"
                        :resource="selectedResource"
            />
          </ScrollArea>
        </ResizablePanel>

      </ResizablePanelGroup>

    </main>


  </div>
</template>
