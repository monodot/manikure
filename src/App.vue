<script setup lang="ts">
import Playground from "./components/Playground.vue";
import { resources } from "./templates/default"; // Load an initial/default set of resources
</script>

<template>
  <Playground :resources="resources" />
</template>
