<script setup lang="ts">
import { dump } from 'js-yaml';
import type {Resource} from "@/types/resource.ts";
import {Badge} from "@/components/ui/badge";
import { cleanupEmptyValues } from '@/lib/utils';

defineProps<{
  resource: Resource
}>();

const formatYaml = (resource: Resource) => {
  const { id, ...resourceWithoutId } = resource;
  const cleaned = cleanupEmptyValues(resourceWithoutId);
  return dump(cleaned);
};
</script>

<template>
  <div class="lg:flex-1 p-4 h-full bg-muted relative overflow-y-auto">
    <Badge variant="outline" class="absolute right-3 top-3">
      Output
    </Badge>
    <pre class="text-sm"><code>{{ formatYaml(resource) }}</code></pre>
  </div>
</template>
