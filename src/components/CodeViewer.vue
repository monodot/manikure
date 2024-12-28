<script setup lang="ts">
defineProps<{
  code: Record<string, any>
}>();
</script>

<template>
  <pre class="text-sm"><code>{{ JSON.stringify(code, null, 2) }}</code></pre>
</template>
