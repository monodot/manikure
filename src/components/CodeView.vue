<script setup>
import { ref, computed } from 'vue'
import { useProjectStore } from '../stores/project'
import { usePreferencesStore } from '../stores/preferences'
import jsyaml from 'js-yaml'

const project = useProjectStore()
const prefs = usePreferencesStore()
const tehCode = ref(project.documents[project.selectedDocument])
const foobartest = ref(project.foobartest)

const renderedCode = computed(() => renderCode(tehCode.value));

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
    <!-- Copy to clipboard -->
    <div class="p-4">
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="copyToClipboard">Copy to clipboard</button>
    </div>
    <!-- <textarea v-text="renderCode(tehCode)" class="px-4 lg:flex-auto lg:w-auto h-0 overflow-y-auto space-y-4 bg-gray-800 text-gray-100 font-mono p-2" readonly=""></textarea> -->
    <textarea v-text="renderedCode" class="px-4 lg:flex-auto lg:w-auto h-0 overflow-y-auto space-y-4 bg-gray-800 text-gray-100 font-mono p-2" readonly=""></textarea>

</template>
