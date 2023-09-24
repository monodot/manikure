<script setup>
import { ref } from 'vue'
import { useProjectStore } from '../stores/project'

const project = useProjectStore()
const tehObject = ref(project.documents[project.selectedDocument])
</script>

<template>
  <div class="p-4" aria-label="Deployment Properties">
    <h2 class="text-4xl font-bold text-gray-800 py-4">Deployment</h2>
    <p>A Deployment provides declarative updates for Pods and ReplicaSets.</p>
    <div class="">
      <div class="">
        <div>
          <label>Deployment name:</label>
          <input v-model="tehObject.metadata.name"
                  class="appearance-none bg-gray-200 w-full py-2 px-4 block rounded text-gray-800 focus:outline-none focus:shadow-outline">
        </div>
        <div>
          <label>Replicas:</label>
          <input v-model="tehObject.spec.replicas"
                  class="appearance-none bg-gray-200 w-full py-2 px-4 block rounded text-gray-800 focus:outline-none focus:shadow-outline">
        </div>
        <div>
          <label>Container name:</label>
          <input v-model="tehObject.spec.template.spec.containers[0].name"
                  class="appearance-none bg-gray-200 w-full py-2 px-4 block rounded text-gray-800 focus:outline-none focus:shadow-outline">
        </div>
        <div>
          <label>Container image:</label>
          <input v-model="tehObject.spec.template.spec.containers[0].image"
                  class="appearance-none bg-gray-200 w-full py-2 px-4 block rounded text-gray-800 focus:outline-none focus:shadow-outline">
        </div>
        <div>
          <label>Environment variable name:</label>
          <input v-model="tehObject.spec.template.spec.containers[0].env[0].name"
                  class="appearance-none bg-gray-200 w-full py-2 px-4 block rounded text-gray-800 focus:outline-none focus:shadow-outline">
        </div>
        <div>
          <label>Environment variable source ConfigMap name:</label>
          <input v-model="tehObject.spec.template.spec.containers[0].env[0].valueFrom.configMapKeyRef.name"
                  class="appearance-none bg-gray-200 w-full py-2 px-4 block rounded text-gray-800 focus:outline-none focus:shadow-outline">
        </div>
        <div>
          <label>Environment variable source ConfigMap key:</label>
          <input v-model="tehObject.spec.template.spec.containers[0].env[0].valueFrom.configMapKeyRef.key"
                  class="appearance-none bg-gray-200 w-full py-2 px-4 block rounded text-gray-800 focus:outline-none focus:shadow-outline">
        </div>
        <div>
          <label>Container port:</label>
          <input v-model="tehObject.spec.template.spec.containers[0].ports[0].containerPort"
                  class="appearance-none bg-gray-200 w-full py-2 px-4 block rounded text-gray-800 focus:outline-none focus:shadow-outline">
        </div>
      </div>
    </div>
  </div>
</template>

