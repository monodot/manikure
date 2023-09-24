<script setup>
import Deployment from '../components/Deployment.vue'
import Service from '../components/Service.vue'
import Ingress from '../components/Ingress.vue'
import Pod from '../components/Pod.vue'
import CodeView from '../components/CodeView.vue'
import { useProjectStore } from '../stores/project'

const project = useProjectStore()
</script>

<template>
    <main class="grid grid-cols-2">
        <Deployment v-if="project.documents[project.selectedDocument].kind === 'Deployment'"/>
        <Service v-if="project.documents[project.selectedDocument].kind === 'Service'"/>
        <Ingress v-if="project.documents[project.selectedDocument].kind === 'Ingress'"/>
        <Pod v-if="project.documents[project.selectedDocument].kind === 'Pod'"/>
        <CodeView />
    </main>
</template>