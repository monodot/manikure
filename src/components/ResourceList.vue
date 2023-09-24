<script setup>
import { useProjectStore } from '../stores/project'
import jsyaml from 'js-yaml'

const project = useProjectStore()

const copyAllAsJSON = () => {
  navigator.clipboard.writeText(JSON.stringify(project.documents, null, 2))
}

const copyAllAsYAML = () => {
  navigator.clipboard.writeText(jsyaml.dump(project.documents))
}
</script>


<template>
  <div class="border-r-2">
    <div>
      <h2 class="p-4 text-lg font-bold">Project</h2>

      <nav v-for="(document, index) in project.documents" :key="index" aria-label="Resource Navigator">
        <input type="radio" :id="'document-' + index" v-model="project.selectedDocument" :value="index" class="hidden peer" />
        <label :for="'document-' + index" class="block p-4 cursor-pointer bg-gray-100 border-b-2 peer-checked:border-l-pink-500 peer-checked:border-l-4 peer-checked:font-bold peer-checked:bg-white ">
          <span class="text-xs text-gray-500 block">{{ document.kind }}</span>
          <span class="font-bold">{{ document.metadata.name }} </span>
        </label>
      </nav>

      <p class="p-4">
        <a @click="copyAllAsJSON" class="cursor-pointer">Copy all as JSON</a>
      </p>
      <p class="p-4">
        <a @click="copyAllAsYAML" class="cursor-pointer">Copy all as YAML</a>
      </p>

    </div>
  </div>
</template>

