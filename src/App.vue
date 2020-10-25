<template>
  <div class="p-6">
    <h1 class="text-2xl font-semibold text-gray-800">Kubernetes Manifest Builder (YAML/JSON)</h1>
    <p class="text-sm">WORK IN PROGRESS! - See <a href="https://github.com/monodot/k8s-manifest-builder" class="text-blue-700">monodot/k8s-manifest-builder</a></p>

    <p class="py-4">Create Deployment, Service and Pod manifests for Kubernetes by completing a simple form.</p>
    <p class="py-2">
      Output format: 
      <label><input type="radio" id="yaml" value="yaml" v-model="format" /> YAML</label>
      <label><input type="radio" id="json" value="json" v-model="format" /> JSON</label>
    </p>

    <Pod/>
    <Deployment/>
    <Service/>

  </div>
</template>

<script>
import Pod from './components/Pod.vue'
import Deployment from './components/Deployment.vue'
import Service from './components/Service.vue'

// Add states and methods to the root component here
export default {
  name: 'App',
  components: {
    Pod,
    Deployment,
    Service
  },
  data() {
    return {
      format: "yaml"
    }
  }
}
</script>
