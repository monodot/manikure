<script setup>
import imgUrl from '../assets/logo.png'

const close = defineEmits(['close'])

const closeModal = () => {
    console.log('close modal')
    close('close')
}

</script>

<template>
  <div class="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-sky-500/50">
    <div class="modal-content bg-white p-6 rounded shadow-lg w-96">
      <img :src="imgUrl" alt="Manikure logo" class="w-2/3 mx-auto" />
      <h2 class="text-2xl font-semibold my-2 text-center">Manikure</h2>
      <p class="text-center">The manifest builder for Kubernetes resources.</p>
      <button id="close-modal" @click="closeModal" class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-4">
        Close
      </button>
    </div>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
