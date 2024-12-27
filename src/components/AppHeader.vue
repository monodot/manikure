<script setup>
import { usePreferencesStore } from '../stores/preferences';

const emit = defineEmits(['showAbout', 'showNewProject'])
const showAbout = () => {
    console.log('about clicked')
    emit('showAbout')
}

const showNewProject = () => {
    console.log('new project clicked')
    emit('showNewProject')
}

const prefs = usePreferencesStore()
</script>

<template>
    <div class="border-b-2">
        <div class="flex justify-between">
            <div class="flex flex-wrap justify-center">
                <a @click="showNewProject" class="p-4 cursor-pointer">New Project</a>
                <p class="p-4">Manikure Studio 💅 &#8212; <strong>Mani</strong>fest Builder for <strong>Ku</strong>bernetes <strong>Re</strong>sources</p>
            </div>
            <nav class="flex flex-wrap justify-center">
                <div>
                    <label class="inline-block p-4">
                        <input type="radio" name="code-view-language" value="json" v-model="prefs.codeViewLanguage" class="peer" />
                        JSON
                    </label>
                    <label class="inline-block p-4">
                        <input type="radio" name="code-view-language" value="yaml" v-model="prefs.codeViewLanguage" class="peer" />
                        YAML
                    </label>
                </div>
                <a @click="showAbout" class="p-4 cursor-pointer">About</a>
                <a href="https://github.com/monodot/k8s-manifest-builder" target="_blank" class="p-4">GitHub</a>
            </nav>
        </div>
    </div>
</template>