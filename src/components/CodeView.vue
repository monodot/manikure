<script setup>
// "Composition API": Define a component's logic using imported API functions.
const props = defineProps({
    code: String
})

</script>

<template>
    <pre v-text="code" class="font-mono py-2 px-3"></pre>
</template>
