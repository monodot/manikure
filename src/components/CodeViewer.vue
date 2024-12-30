<script setup lang="ts">
import { dump } from 'js-yaml';
import type {Resource} from "@/types/resource.ts";

defineProps<{
  resource: Resource
}>();

const formatYaml = (resource: Resource) => {
  return dump(resource);
};
</script>

<template>
  <div class="p-4 bg-gray-100">
    <pre class="text-sm"><code>{{ formatYaml(resource) }}</code></pre>
  </div>
</template>
