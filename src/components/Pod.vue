<script setup>
import { ref } from 'vue'
import { useProjectStore } from '../stores/project'

import jsonData from '../api/pod-curated.json'

const project = useProjectStore()
const pod = ref(project.documents[project.selectedDocument])

function renderCode(document) {
  return JSON.stringify(document, null, 2)
}

// console.log(podDefinition)
</script>

<template>
  <div class="p-4" aria-label="Pod Properties">
    <!-- <textarea v-text="renderCode(jsonData)"></textarea>
    <hr/> -->
    <h2 class="text-4xl font-bold text-gray-800 py-4">Pod</h2>
    <p v-text="jsonData.description"></p>

    <div class="my-4">
      <h3 class="text-2xl">Spec</h3>
      <template v-for="(value, key) in jsonData.properties.spec.properties">
        <template v-for="(value2, key2) in value.items?.properties">
          <div>
            <label>
              <strong v-text="key2"></strong>
              <span v-text="value2.description"></span>
            </label>
            <input v-model="pod.spec[key2]"
                    v-bind:placeholder="value2.type"
                    class="appearance-none bg-gray-200 w-full py-2 px-4 block rounded text-gray-800 focus:outline-none focus:shadow-outline">
          </div>
        </template>
        <div>
          <label>
            <strong v-text="key"></strong>
            <span v-text="value.description"></span>
          </label>
          <input v-model="pod.spec[key]"
                  v-bind:placeholder="value.type"
                  class="appearance-none bg-gray-200 w-full py-2 px-4 block rounded text-gray-800 focus:outline-none focus:shadow-outline">
        </div>
      </template>
    </div>
    <hr/>

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
