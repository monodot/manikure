<template>
  <div class="flex h-screen p-4 gap-4">
    <div class="w-1/2 bg-white rounded-lg shadow p-4">
      <h2 class="text-xl font-bold mb-4">Deployment Editor</h2>
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium">Application Name</label>
          <input
            v-model="deployment.metadata.name"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            @input="updateLabels"
          />
        </div>
        <div>
          <label class="block text-sm font-medium">Replicas</label>
          <input
            v-model.number="deployment.spec.replicas"
            type="number"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>
        <div>
          <label class="block text-sm font-medium">Container Image</label>
          <input
            v-model="deployment.spec.template.spec.containers[0].image"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>
        <div>
          <label class="block text-sm font-medium">Container Port</label>
          <input
            v-model.number="deployment.spec.template.spec.containers[0].ports[0].containerPort"
            type="number"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>
      </div>
    </div>

    <div class="w-1/2 bg-white rounded-lg shadow p-4">
      <h2 class="text-xl font-bold mb-4">Generated JSON</h2>
      <textarea
        v-model="jsonText"
        class="w-full h-[calc(100%-2rem)] font-mono bg-gray-50 p-2 rounded"
        @input="updateFromJson"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'

const useDeploymentStore = defineStore('deployment', {
  state: () => ({
    deployment: {
      apiVersion: 'apps/v1',
      kind: 'Deployment',
      metadata: {
        name: 'my-app',
        labels: {
          app: 'my-app',
        },
      },
      spec: {
        replicas: 1,
        selector: {
          matchLabels: {
            app: 'my-app',
          },
        },
        template: {
          metadata: {
            labels: {
              app: 'my-app',
            },
          },
          spec: {
            containers: [
              {
                name: 'main',
                image: 'nginx:latest',
                ports: [
                  {
                    containerPort: 80,
                  },
                ],
              },
            ],
          },
        },
      },
    },
  }),
  actions: {
    updateLabels(name) {
      this.deployment.metadata.labels.app = name
      this.deployment.spec.selector.matchLabels.app = name
      this.deployment.spec.template.metadata.labels.app = name
    },
  },
})

const store = useDeploymentStore()
const deployment = computed(() => store.deployment)
const jsonText = ref(JSON.stringify(deployment.value, null, 2))

const updateLabels = () => {
  store.updateLabels(deployment.value.metadata.name)
}

const updateFromJson = () => {
  try {
    const newDeployment = JSON.parse(jsonText.value)
    store.deployment = newDeployment
  } catch (e) {
    // Handle invalid JSON
  }
}

watch(
  deployment,
  (newVal) => {
    jsonText.value = JSON.stringify(newVal, null, 2)
  },
  { deep: true },
)
</script>

<style scoped>
input:focus,
textarea:focus {
  outline: none;
  ring: 2px;
  ring-color: rgb(59, 130, 246);
}
</style>

