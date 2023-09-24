<script setup>
import { ref } from 'vue'
import { useProjectStore } from '../stores/project'

const project = useProjectStore()
const ingress = ref(project.documents[project.selectedDocument])
</script>

<template>
  <div class="p-4" aria-label="Ingress Properties">
    <h2 class="text-4xl font-bold text-gray-800 py-4">Ingress</h2>
    <p>Ingress is a collection of rules that allow inbound connections to reach the
    endpoints defined by a backend.</p>
    <div class="">
      <div class="">
        <div>
          <label>Ingress name:</label>
          <input v-model="ingress.metadata.name"
                  class="appearance-none bg-gray-200 w-full py-2 px-4 block rounded text-gray-800 focus:outline-none focus:shadow-outline">
        </div>
      </div>
    </div>
  </div>
</template>

