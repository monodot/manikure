<script setup lang="ts">
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toast";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import {computed, ref} from "vue";
import CodeViewer from "./CodeViewer.vue";
import TemplateDialog from "./TemplateDialog.vue";
import ImportDialog from "@/components/ImportDialog.vue";
import ResourcesList from "./ResourcesList.vue";
import { useToast } from "@/components/ui/toast/use-toast";
import { Clipboard, ExternalLink } from "lucide-vue-next";
import { dump } from 'js-yaml';
import type {Resource} from "@/types/resource.ts";
import ResourceForm from "@/components/ResourceForm.vue";
import { generateId } from "@/lib/utils.ts";
import { resources as defaultResources } from "@/templates/default"; // Load an initial/default set of resources
import WelcomeDialog from "@/components//WelcomeDialog.vue";

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
  resources.value = [{
    id: 1,
    apiVersion: "apps/v1",
    kind: "Deployment",
    metadata: {
      name: "my-app"
    }
  }];
  selectedResourceId.value = resources.value[0].id || null; // Or null, because Resource type's ID field is nullable
};

const copyToClipboard = () => {
  const yamlDocs = resources.value.map(r => dump(r)).join('---\n');
  navigator.clipboard.writeText(yamlDocs);
  toast({
    description: "Resources copied to your clipboard!",
  });
};

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
        <Button
          variant="outline"
          size="sm"
          class="gap-1.5 text-sm"
          @click="copyToClipboard"
        >
          <Clipboard class="size-3.5" />
          Copy all
        </Button>

        <a href="https://github.com/monodot/manikure" class="text-sm font-medium px-2 flex items-center gap-1">
          <span>GitHub</span>
          <ExternalLink class="size-3" />
        </a>
      </div>
    </header>

    <main class="lg:flex lg:flex-1">

      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel :default-size="20">
          <ResourcesList
            :resources="resources"
            :selectedResourceId="selectedResourceId"
            @select="selectedResourceId = $event"
            @remove-resource="removeResource"
            @clear-all="clearAll"
            />
        </ResizablePanel>

        <ResizableHandle />

        <ResizablePanel :default-size="40">
          <ResourceForm
              v-if="selectedResource"
              :key="selectedResourceId || 0"
              :modelValue="selectedResource"
              @update:modelValue="updateResource"
          />
        </ResizablePanel>

        <ResizableHandle />

        <ResizablePanel :default-size="40">
          <CodeViewer v-if="selectedResource"
                      :resource="selectedResource"
                      />
        </ResizablePanel>

      </ResizablePanelGroup>

    </main>


  </div>
</template>
