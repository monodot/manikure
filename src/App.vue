<script setup lang="ts">
import Playground from "./components/Playground.vue";
import { resources } from "./templates/default"; // Load an initial/default set of resources
import TmpUserPage from "./components/TmpUserPage.vue"
</script>

<template>
<!--  <Playground :resources="resources" />-->
  <TmpUserPage/>
</template>
