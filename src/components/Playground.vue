<script setup lang="ts">
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {Toaster} from "@/components/ui/toast";
import {computed, onMounted, ref, watch} from "vue";
import CodeViewer from "@/components/CodeViewer.vue";
import ImportDialog from "@/components/ImportDialog.vue";
import ResourcesList from "@/components/ResourcesList.vue";
import {useToast} from "@/components/ui/toast/use-toast";
import {Clipboard, ExternalLink} from "lucide-vue-next";
import {dump} from 'js-yaml';
import type {Resource} from "@/types/resource.ts";
import ResourceForm from "@/components/ResourceForm.vue";
import {cleanupEmptyValues, generateId} from "@/lib/utils.ts";
import WelcomeDialog from "@/components/WelcomeDialog.vue";
import ShareButton from "@/components/ShareButton.vue";
import DarkModeButton from "@/components/DarkModeButton.vue";
import AboutBox from "@/components/AboutBox.vue";
import {loadProject, saveProject} from "@/lib/store.ts";
import {loadSharedResources} from "@/lib/project.ts";

const {toast} = useToast();

const resources = ref<Resource[]>(loadProject());

watch(
    resources,
    (newResources) => {
      saveProject(newResources);
    },
    {deep: true}
);


const selectedResourceId = ref<number | null>(1);
const selectedResource = computed(() => {
  return resources.value.find((resource) => resource.id === selectedResourceId.value) || null;
})

const updateResource = (updatedResource: Resource) => {
  const plainResource = JSON.parse(JSON.stringify(updatedResource)); // Create a plain object copy without reactive wrapping
  const index = resources.value.findIndex((resource) => resource.id === plainResource.id);
  if (index !== -1) {
    resources.value[index] = plainResource;
    // console.debug('Updated resource: ', plainResource);
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
  selectedResourceId.value = null;
};

const copyToClipboard = () => {
  const yamlDocs = resources.value.map(r => {
    const {id, ...resourceWithoutId} = r;
    const cleaned = cleanupEmptyValues(resourceWithoutId);
    return dump(cleaned);
  }).join('---\n');
  navigator.clipboard.writeText(yamlDocs);
  toast({
    description: "Resources copied to your clipboard!",
  });
};

const loadSharedResourcesFromUrl = () => {
  // TODO: Maybe add a confirmation dialog here - "will replace existing resources. Are you sure?"
  const { resources: sharedResources, selectedId: selectedId } = loadSharedResources();

  if (sharedResources.length > 0) {
    resources.value = sharedResources;
    selectedResourceId.value = selectedId;
  }
};

onMounted(() => {
  loadSharedResourcesFromUrl();
});

</script>

<template>
  <Toaster/>
  <WelcomeDialog/>
  <div class="flex flex-col h-screen">
    <header
        class="flex-none sticky top-0 z-10 flex justify-between h-[60px] items-center gap-1 border-b bg-background px-4"
    >
      <div class="flex items-center gap-2">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="hidden lg:display w-6 h-6">
          <path
              d="M11.7397 1.62537C11.9042 1.54614 12.0958 1.54614 12.2603 1.62537L20.3398 5.51624C20.5043 5.59547 20.6238 5.7453 20.6644 5.92331L22.6599 14.666C22.7005 14.844 22.6579 15.0309 22.5441 15.1736L16.9529 22.1848C16.839 22.3275 16.6664 22.4107 16.4838 22.4107H7.51622C7.33363 22.4107 7.16097 22.3275 7.04712 22.1848L1.45595 15.1736C1.3421 15.0309 1.29946 14.844 1.34009 14.666L3.33556 5.92331C3.37619 5.7453 3.49567 5.59547 3.66018 5.51624L11.7397 1.62537Z"
              stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <h1 class="flex text-xl font-semibold gap-1">
          Manikure
        </h1>
        <Badge variant="secondary" class="text-xs hidden lg:block">Preview</Badge>
        <p class="hidden lg:block text-gray-500 text-sm">A manifest editor for Kubernetes resources</p>
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
        }"/>
        <ShareButton
            :resources="resources"
        />

        <Button
            variant="default"
            class="h-9 w-9 lg:h-9 lg:w-auto lg:px-4 lg:py-2 gap-1.5"
            @click="copyToClipboard"
        >
          <Clipboard class="size-3.5"/>
          <span class="hidden lg:block">Copy YAML</span>
        </Button>

        <DarkModeButton/>

        <a href="https://github.com/monodot/manikure" target="_blank"
           class="hidden lg:block text-sm font-medium px-2 flex items-center gap-1 hover:underline">
          <span>GitHub</span>
        </a>

        <AboutBox/>
      </div>
    </header>

    <main class="lg:flex lg:flex-1 min-h-0">

        <ResourcesList
            :resources="resources"
            :selectedResourceId="selectedResourceId"
            @select="selectedResourceId = $event"
            @remove-resource="removeResource"
            @clear-all="clearAll"
            @add-resource="(template) => {
                  template.forEach((resource) => {
                    resources.push({
                      id: generateId(resources),
                      ...resource,
                    });
                  });
                }"
        />

        <ResourceForm
            v-if="selectedResource"
            :key="selectedResourceId || 0"
            :modelValue="selectedResource"
            @update:modelValue="updateResource"
        />

        <CodeViewer v-if="selectedResource"
                    :resource="selectedResource"
        />

    </main>


  </div>
</template>
