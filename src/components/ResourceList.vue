<script setup>
import { useProjectStore } from '../stores/project'

const project = useProjectStore()
</script>


<template>
  <div class="p-4 border-r-2">
    <div>
      <h2 class="text-lg font-bold">Project</h2>
      <div v-for="(document, index) in project.documents" :key="index">
        <label>
          <input type="radio" v-model="project.selectedDocument" :value="index" />
          {{ document.kind }} - {{ document.metadata.name }} ({{  document.apiVersion }})
          <button @click="project.removeDocument(index)">Remove</button>
        </label>
      </div>

      <p class="my-4">
        <a href="#">+ Deployment</a>
      </p>

      <p class="my-4">
        <a href="#">Export</a>
      </p>
    </div>
  </div>
</template>

