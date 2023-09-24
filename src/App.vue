<script setup>
import ResourceList from './components/ResourceList.vue'
import CanvasView from './views/CanvasView.vue'
import AppHeader from './components/AppHeader.vue'
import AboutBox from './components/AboutBox.vue'
import { ref } from 'vue'

const aboutVisible = ref(false)

const showAbout = () => {
    console.log('about received')
    aboutVisible.value = true
}

</script>

<template>
  <header>
    <AppHeader @show-about="showAbout"/>
  </header>

  <main class="grid grid-cols-sidebar-with-canvas">
    <ResourceList />
    <CanvasView />
  </main>

  <AboutBox v-if="aboutVisible" @close="aboutVisible = false" />
</template>

<style scoped>

@media (min-width: 1024px) {
  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
