<script setup>
import { ref } from 'vue'
import { useProjectStore } from '../stores/project'

const project = useProjectStore()
const pod = ref(project.documents[project.selectedDocument])
</script>

<template>
  <div class="p-4" aria-label="Pod Properties">
    <h2 class="text-4xl font-bold text-gray-800 py-4">Pod</h2>
    <div class="">
      <div class="">
        <div>
          <label>Pod name:</label>
          <input v-model="pod.metadata.name"
                  class="appearance-none bg-gray-200 w-full py-2 px-4 block rounded text-gray-800 focus:outline-none focus:shadow-outline">
        </div>
        <div>
          <label>Container name:</label>
          <input v-model="pod.spec.containers[0].name"
                  class="appearance-none bg-gray-200 w-full py-2 px-4 block rounded text-gray-800 focus:outline-none focus:shadow-outline">
        </div>
        <div>
          <label>Container image:</label>
          <input v-model="pod.spec.containers[0].image"
                  class="appearance-none bg-gray-200 w-full py-2 px-4 block rounded text-gray-800 focus:outline-none focus:shadow-outline">
        </div>
      </div>
    </div>
  </div>
</template>
