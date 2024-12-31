<script setup lang="ts">
import { dump } from 'js-yaml';
import type {Resource} from "@/types/resource.ts";

defineProps<{
  resource: Resource
}>();

const formatYaml = (resource: Resource) => {
  const { id, ...resourceWithoutId } = resource;
  return dump(resourceWithoutId);
};
</script>

<template>
  <div class="p-4 bg-gray-100 h-full">
    <pre class="text-sm"><code>{{ formatYaml(resource) }}</code></pre>
  </div>
</template>
