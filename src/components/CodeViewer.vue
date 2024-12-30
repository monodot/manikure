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
  <pre class="text-sm"><code>{{ formatYaml(resource) }}</code></pre>
</template>
