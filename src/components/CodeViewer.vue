<script setup lang="ts">
import { dump } from 'js-yaml';
import type {Resource} from "@/types/resource.ts";
import {Badge} from "@/components/ui/badge";

defineProps<{
  resource: Resource
}>();

const formatYaml = (resource: Resource) => {
  const { id, ...resourceWithoutId } = resource;
  return dump(resourceWithoutId);
};
</script>

<template>
  <div class="p-4 h-full relative">
    <Badge variant="outline" class="absolute right-3 top-3">
      Output
    </Badge>
    <pre class="text-sm"><code>{{ formatYaml(resource) }}</code></pre>
  </div>
</template>
