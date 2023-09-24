<script setup>
import { defineProps, defineEmits, reactive, watch } from 'vue'
import { useProjectStore } from '../stores/project';

const project = useProjectStore()
const service = reactive(project.documents[project.selectedDocument])
</script>

<template>
  <div class="p-4" aria-label="Service Properties">
    <h2 class="text-4xl font-bold text-gray-800 py-4">Service</h2>
    <p>An abstract way to expose an application running on a set of Pods as a network service.</p>
    <div class="md:flex md:flex-wrap">
      <div class="md:w-1/2 md:pr-4">
        <div>
          <label>Service name:</label>
          <input v-model="service.metadata.name"
                  class="appearance-none bg-gray-200 w-full py-2 px-4 block rounded text-gray-800 focus:outline-none focus:shadow-outline">
        </div>
      </div>
    </div>
  </div>
</template>
