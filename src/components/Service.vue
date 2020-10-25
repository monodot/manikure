<template>
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
    <div class="md:w-1/2 py-4">
      <pre v-text="compiledMarkdown" class="font-mono border py-2 px-3 shadow bg-white"></pre>
    </div>    
  </div>
</template>

<script>
const yaml = require('js-yaml');

export default {
  name: 'service',
  props: {
    msg: String
  },
  data() {
    return {
      format: "yaml",
      service: {
        apiVersion: "v1",
        kind: "Service",
        metadata: {
          name: "my-service"
        },
        spec: {
          selector: {
            app: "my-app-label"
          },
          ports: [{
            protocol: "TCP",
            port: 80,
            targetPort: 8080
          }]
        }
      }
    }
  },
  computed: {
    compiledMarkdown: function() {
      if (this.$parent.format == "yaml") {
        return yaml.safeDump(this.service)
      } else {
        return JSON.stringify(this.service, null, 2)
      }
    }
  }
}
</script>
