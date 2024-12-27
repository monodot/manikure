<script setup>
import Deployment from '../components/Deployment.vue'
import Service from '../components/Service.vue'
import Ingress from '../components/Ingress.vue'
// import Pod from '../components/Pod.vue'
import KubernetesResource from '../components/KubernetesResource.vue'
import CodeView from '../components/CodeView.vue'
// import { useProjectStore } from '../stores/project'

// const project = useProjectStore()
</script>

<template>
    <div class="">
        <!-- <Deployment v-if="project.documents[project.selectedDocument].kind === 'Deployment'"/>
        <Service v-if="project.documents[project.selectedDocument].kind === 'Service'"/>
        <Ingress v-if="project.documents[project.selectedDocument].kind === 'Ingress'"/>
        <Pod v-if="project.documents[project.selectedDocument].kind === 'Pod'"/> -->
        
    </div>
    <div class="lg:flex lg:flex-col lg:flex-1">
      <div class="p-6 lg:flex-auto lg:w-auto h-0 overflow-y-auto space-y-4 bg-green-200">
        <Suspense>
          <KubernetesResource/>
          <template #fallback>
            Loading...
          </template>
        </Suspense>
      </div>
    </div>
    <div class="lg:flex lg:flex-col lg:flex-1 min-w-0">
      <CodeView />
      <!-- <div class="p-4 lg:flex-auto lg:w-auto h-0 overflow-y-auto space-y-4 bg-pink-200">
      </div> -->
    </div>
</template>