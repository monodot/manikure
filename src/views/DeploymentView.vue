<script setup>
import { ref } from 'vue'
import Deployment from '../components/Deployment.vue'
import CodeView from '../components/CodeView.vue'

const tehCode = ref('')

const updateCode = (code) => {
  tehCode.value = code
}

</script>

<template>
  <main class="object-with-codeview">
    <Deployment @update-code="updateCode"/>
    <CodeView :code="tehCode"/>
  </main>
</template>
