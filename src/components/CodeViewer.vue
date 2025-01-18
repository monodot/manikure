<script setup lang="ts">
import { dump } from 'js-yaml';
import type {Resource} from "@/types/resource.ts";
import {Badge} from "@/components/ui/badge";
import { cleanupEmptyValues } from '@/lib/utils';
import {Code} from 'lucide-vue-next';
import { ref } from 'vue';

defineProps<{
  resource: Resource
}>();

const formatYaml = (resource: Resource) => {
  const { id, ...resourceWithoutId } = resource;
  const cleaned = cleanupEmptyValues(resourceWithoutId);
  return dump(cleaned);
};

const isCodeVisible = ref(true)
</script>

<template>
  <div class="sticky bottom-0 bg-muted lg:static lg:bottom-auto w-full">
    <label class="block lg:hidden px-3 py-3 bg-background flex items-center gap-2 font-semibold border-t border-b cursor-pointer">
      <input type="checkbox" name="show_code" v-model="isCodeVisible" class="hidden"/>
      <Code class="w-4 h-4"/>
      Code viewer
    </label>
    <div v-if="isCodeVisible" class="lg:flex-1 p-3 lg:p-4 h-[300px] lg:h-auto relative overflow-y-auto">
      <Badge variant="outline" class="absolute right-3 top-3">
        Output
      </Badge>
      <pre class="text-sm"><code>{{ formatYaml(resource) }}</code></pre>
    </div>
  </div>
</template>
