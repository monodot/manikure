<script setup>
import { ref } from 'vue'
import { useProjectStore } from '../stores/project'

const project = useProjectStore()
const tehCode = ref(project.documents[project.selectedDocument])

project.$subscribe((mutation, state) => {
    tehCode.value = state.documents[state.selectedDocument]
})

const copyToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(project.documents[project.selectedDocument], null, 2))
}

</script>

<template>
    <div>
        <!-- Copy to clipboard -->
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="copyToClipboard">Copy to clipboard</button>

        <pre v-text="tehCode" class="font-mono py-2 px-3"></pre>
    </div>
</template>
