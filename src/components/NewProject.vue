<script setup>
// "Composition API": Define a component's logic using imported API functions.
import { useProjectStore } from '../stores/project'

const close = defineEmits(['close'])
const project = useProjectStore()

const closeModal = () => {
    console.log('close modal')
    close('close')
}

const templates = await fetch('/templates/catalog.json')
    .then(response => response.json())
    .then(data => data)

const runTemplate = async (templateId) => {
    const template = await fetch('/templates/' + templateId + '.json')
        .then(response => response.json())
        .then(data => data)
    project.documents = template
    closeModal()
}

</script>

<template>
  <div class="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-sky-500/50">
    <div class="modal-content bg-white p-6 rounded shadow-lg w-96">
      <h2 class="text-2xl font-semibold my-2 text-center">New Project</h2>
      <p class="text-center">Pick a template from our library</p>
      <ul>
        <li v-for="template in templates.items">
          <a @click="runTemplate(template.id)" class="cursor-pointer">{{ template.name }}</a>
        </li>
      </ul>
      <button id="close-modal" @click="closeModal" class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-4">
        Cancel
      </button>
    </div>
  </div>
</template>