<script setup>
import { ref, computed } from 'vue'
import { useProjectStore } from '../stores/project'
import { usePreferencesStore } from '../stores/preferences'
import jsyaml from 'js-yaml'

const project = useProjectStore()
const prefs = usePreferencesStore()
const tehCode = ref(project.documents[project.selectedDocument])

function renderCode(document) {
    if (prefs.codeViewLanguage === 'yaml') {
        return jsyaml.dump(document)
    } else {
        return JSON.stringify(document, null, 2)
    }
}

const copyToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(project.documents[project.selectedDocument], null, 2))
}

project.$subscribe((mutation, state) => {
    tehCode.value = state.documents[state.selectedDocument]
})

</script>

<template>
    <div class="flex flex-col flex-1 min-w-0">
        <!-- Copy to clipboard -->
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="copyToClipboard">Copy to clipboard</button>

        <textarea v-text="renderCode(tehCode)" class="flex-auto font-mono p-2" readonly=""></textarea>
    </div>
</template>
