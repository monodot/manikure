<script setup>
import ResourceList from './components/ResourceList.vue'
import CanvasView from './views/CanvasView.vue'
import AppHeader from './components/AppHeader.vue'
import AboutBox from './components/AboutBox.vue'
import { ref } from 'vue'
import NewProject from './components/NewProject.vue'

const aboutVisible = ref(false)
const newProjectVisible = ref(false)

const showAbout = () => {
    console.log('about received')
    aboutVisible.value = true
}
const showNewProject = () => {
    console.log('new project received')
    newProjectVisible.value = true
}

</script>

<template>
  <!-- App header: title, main menu, etc. -->
  <header>
    <AppHeader @show-about="showAbout" @show-new-project="showNewProject"/>
  </header>

  <!-- Main app area: where the magic happens -->
  <main class="lg:flex lg:flex-1">
    <div class="lg:flex lg:flex-col w-48">
      <div class="p-4 lg:flex-auto lg:w-auto h-0 overflow-y-auto bg-yellow-200">
        <ResourceList />
      </div>
    </div>
    <CanvasView />
  </main>

  <!-- Status bar: status messages, etc.  -->
  <div class="lg:flex px-4 py-0 text-white bg-pink-400">
    <p class="lg:flex-1 text-center lg:text-left">
      A status message will go here...
    </p>
    <p class="lg:flex-1 text-center">
      Some more text here!
    </p>
    <p class="lg:flex-1 text-center py-4 lg:py-0 lg:text-right">
      🍍 🍍 🍍 🐫 🐫 🐫
    </p>
  </div>

  <!-- A place to put pop-ups and modals (for now) -->
  <AboutBox v-if="aboutVisible" @close="aboutVisible = false" />

  <!-- Suspense is used to prevent this component from showing until its data has been fetched -->
  <Suspense>
    <NewProject v-if="newProjectVisible" @close="newProjectVisible = false" />
  </Suspense>
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
