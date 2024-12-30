<script setup lang="ts">

defineProps<{
  user: any;
}>();
</script>

<template>
  <pre>{{ user }}</pre>
</template>
