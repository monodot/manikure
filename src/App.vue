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

    <hr/>

    <h2 class="text-4xl font-bold text-gray-800 py-4">How to use this tool</h2>

    <div class="text-lg">
      <p class="py-4">
        Use this Kubernetes Manifest Builder to generate fresh, delicious, syntactically-valid YAML or JSON 🍞, which you can apply to your Kubernetes cluster.
      </p>

      <p class="py-4">How does it work?</p>
      <ol class="list-decimal">
        <li>Use this web UI to enter the details of your new Kubernetes object.</li>
        <li>Copy the YAML to your favourite text editor and save to a file.</li>
        <li>Apply the YAML to your cluster using <code>kubectl apply -f ...</code> or <code>oc apply -f ..</code>🌠</li>
        <li>Take the rest of the day off.</li>
      </ol>

      <p class="py-4"><strong class="font-bold">Kubernetes Manifest Generator</strong> by Tom D. The <a href="https://github.com/monodot/k8s-manifest-builder" class="text-blue-700">source code</a> is licensed under GNU GPLv3. Made with 💙 in London.</p>
    </div>
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
