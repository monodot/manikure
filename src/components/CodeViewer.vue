<script setup lang="ts">
import yaml from 'js-yaml';

defineProps<{
  code: Record<string, any>[]
}>();

const formatYaml = (resources: Record<string, any>[]) => {
  return resources.map(r => yaml.dump(r)).join('---\n');
};
</script>

<template>
  <pre class="text-sm"><code>{{ formatYaml(code) }}</code></pre>
</template>
