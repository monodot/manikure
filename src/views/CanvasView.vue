<script setup>
import Deployment from '../components/Deployment.vue'
import Service from '../components/Service.vue'
import CodeView from '../components/CodeView.vue'
import { ref } from 'vue'
import { useProjectStore } from '../stores/project'

const project = useProjectStore()
</script>

<template>
    <main class="grid grid-cols-2">
        <Deployment v-if="project.documents[project.selectedDocument].kind === 'Deployment'"/>
        <Service v-if="project.documents[project.selectedDocument].kind === 'Service'"/>
        <CodeView code="TODO remove this"/>
    </main>
</template>