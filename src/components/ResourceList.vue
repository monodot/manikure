<template>
  <div>
    <h1>A list of open files</h1>
    <select>
      <option v-for="file in files" :key="file.id">
        {{ file.name }}
      </option>
    </select>
    <ul>
      <li v-for="file in files" :key="file.id">
        {{ file.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const files = ref([
      { id: 1, name: 'Deployment' },
      { id: 2, name: 'Service' },
      { id: 3, name: 'ConfigMap' },
      { id: 4, name: 'Secret' },
    ])

    return {
      files,
    }
  },
}
</script>
