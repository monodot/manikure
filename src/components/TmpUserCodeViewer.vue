<script setup lang="ts">

const props = defineProps<{
  user: any;
}>();
</script>

<template>
  <pre>{{ user }}</pre>
</template>
