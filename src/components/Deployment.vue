<template>
  <h2 class="text-4xl font-bold text-gray-800 py-4">Deployment</h2>
  <p>A Deployment provides declarative updates for Pods and ReplicaSets.</p>
  <div class="md:flex md:flex-wrap">
    <div class="md:w-1/2 md:pr-4">
      <div>
        <label>Deployment name:</label>
        <input v-model="deployment.metadata.name"
                class="appearance-none bg-gray-200 w-full py-2 px-4 block rounded text-gray-800 focus:outline-none focus:shadow-outline">
      </div>
      <div>
        <label>Replicas:</label>
        <input v-model="deployment.spec.replicas"
                class="appearance-none bg-gray-200 w-full py-2 px-4 block rounded text-gray-800 focus:outline-none focus:shadow-outline">
      </div>
      <div>
        <label>Container name:</label>
        <input v-model="deployment.spec.template.spec.containers[0].name"
                class="appearance-none bg-gray-200 w-full py-2 px-4 block rounded text-gray-800 focus:outline-none focus:shadow-outline">
      </div>
      <div>
        <label>Container image:</label>
        <input v-model="deployment.spec.template.spec.containers[0].image"
                class="appearance-none bg-gray-200 w-full py-2 px-4 block rounded text-gray-800 focus:outline-none focus:shadow-outline">
      </div>
      <div>
        <label>Environment variable name:</label>
        <input v-model="deployment.spec.template.spec.containers[0].env[0].name"
                class="appearance-none bg-gray-200 w-full py-2 px-4 block rounded text-gray-800 focus:outline-none focus:shadow-outline">
      </div>
      <div>
        <label>Environment variable source ConfigMap name:</label>
        <input v-model="deployment.spec.template.spec.containers[0].env[0].valueFrom.configMapKeyRef.name"
                class="appearance-none bg-gray-200 w-full py-2 px-4 block rounded text-gray-800 focus:outline-none focus:shadow-outline">
      </div>
      <div>
        <label>Environment variable source ConfigMap key:</label>
        <input v-model="deployment.spec.template.spec.containers[0].env[0].valueFrom.configMapKeyRef.key"
                class="appearance-none bg-gray-200 w-full py-2 px-4 block rounded text-gray-800 focus:outline-none focus:shadow-outline">
      </div>
      <div>
        <label>Container port:</label>
        <input v-model="deployment.spec.template.spec.containers[0].ports[0].containerPort"
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
  name: 'Deployment',
  props: {
    msg: String
  },
  data() {
    return {
      format: "yaml",
      deployment: {
        apiVersion: "apps/v1",
        kind: "Deployment",
        metadata: {
          name: "my-app",
          labels: {
            app: "my-app-label"
          }
        },
        spec: {
          replicas: 1,
          selector: {
            matchLabels: {
              app: "my-app-label"
            }
          },
          template: {
            metadata: {
              labels: {
                app: "my-app-label"
              }
            },
            spec: {
              containers: [{
                name: "container",
                image: "hello-world",
                env: [{
                  name: "GREETING",
                  valueFrom: {
                    configMapKeyRef: {
                      name: "my-configmap",
                      key: "database.password"
                    }
                  }
                }],
                ports: [{
                  containerPort: 80
                }]
              }]
            }
          }
        }
      }
    }
  },
  computed: {
    compiledMarkdown: function() {
      if (this.$parent.format == "yaml") {
        return yaml.safeDump(this.deployment)
      } else {
        return JSON.stringify(this.deployment, null, 2)
      }
    }
  }
}
</script>
