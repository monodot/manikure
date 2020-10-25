<template>
  <h2 class="text-4xl font-bold text-gray-800 py-4">Pod</h2>
  <div class="md:flex md:flex-wrap">
    <div class="md:w-1/2 md:pr-4">
      <div>
        <label>Pod name:</label>
        <input v-model="pod.metadata.name"
                class="appearance-none bg-gray-200 w-full py-2 px-4 block rounded text-gray-800 focus:outline-none focus:shadow-outline">
      </div>
      <div>
        <label>Container name:</label>
        <input v-model="pod.spec.template.spec.containers[0].name"
                class="appearance-none bg-gray-200 w-full py-2 px-4 block rounded text-gray-800 focus:outline-none focus:shadow-outline">
      </div>
      <div>
        <label>Container image:</label>
        <input v-model="pod.spec.template.spec.containers[0].image"
                class="appearance-none bg-gray-200 w-full py-2 px-4 block rounded text-gray-800 focus:outline-none focus:shadow-outline">
      </div>
      <div>
        <label>Restart policy:</label>
        <select v-model="pod.spec.template.spec.restartPolicy"
                class="appearance-none bg-gray-200 w-full py-2 px-4 block rounded text-gray-800 focus:outline-none focus:shadow-outline">
          <option>Always</option>
          <option>OnFailure</option>
          <option>Never</option>
        </select>
      </div>
    </div>
    <div class="md:w-1/2 py-4">
      <pre v-text="compiledMarkdown" class="font-mono border py-2 px-3 shadow bg-white"></pre>
    </div>    
  </div>
</template>

<script>
const yaml = require('js-yaml');

export default {
  name: 'Pod',
  props: {
    msg: String
  },
  data() {
    return {
      format: "yaml",
      pod: {
        kind: "Pod",
        metadata: {
          name: "my-app"
        },
        spec: {
          template: {
            spec: {
              containers: [{
                name: "container",
                image: "hello-world"
              }],
              restartPolicy: "Always"
            }
          }
        }
      }
    }
  },
  computed: {
    compiledMarkdown: function() {
      if (this.$parent.format == "yaml") {
        return yaml.safeDump(this.pod)
      } else {
        return JSON.stringify(this.pod, null, 2)
      }
    }
  }
}
</script>
