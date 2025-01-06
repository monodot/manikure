<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { ref, onMounted } from "vue";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = 'manikure-welcome-dismissed';
const isOpen = ref(false);

onMounted(() => {
  // Check if the user has previously dismissed the dialog
  const hasSeenWelcome = localStorage.getItem(STORAGE_KEY);
  if (!hasSeenWelcome) {
    isOpen.value = true;
  }
});

const handleDismiss = () => {
  localStorage.setItem(STORAGE_KEY, 'true');
  isOpen.value = false;
};

</script>

<template>
  <Dialog v-model:open="isOpen">
    <DialogContent class="sm:max-w-[500px]">
      <DialogHeader>
        <DialogTitle>Welcome to Manikure Studio!</DialogTitle>
        <DialogDescription>
          The manifest author for Kubernetes resources
        </DialogDescription>
      </DialogHeader>
      <div class="py-4">
        <p class="mb-4">
          Manikure Studio helps you create and edit Kubernetes resources quickly and easily.
          Here's how to get started:
        </p>
        <ul class="space-y-2 list-disc pl-6">
          <li>Use the left panel to manage your resources</li>
          <li>Click "Add from Gallery" to use pre-made templates</li>
          <li>Edit resources using the form in the centre panel</li>
          <li>View the YAML output in the right panel</li>
          <li>Click Copy All to copy all resources as YAML</li>
        </ul>
        <p class="mt-4">
          Thanks for trying out the app! Please share feedback or issues by clicking the <strong>GitHub</strong> link in the app.
        </p>
      </div>
      <DialogFooter>
        <Button @click="handleDismiss">
          Get started
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
