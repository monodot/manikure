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
import { CloudOff } from "lucide-vue-next";
import {Badge} from "@/components/ui/badge";

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
    <DialogContent class="sm:max-w-[600px]">
      <DialogHeader>
        <DialogTitle class="flex items-center gap-2">
          Welcome to Manikure Studio!
          <Badge variant="secondary">Preview</Badge>
        </DialogTitle>
        <DialogDescription>
          The manifest author for Kubernetes resources
        </DialogDescription>
      </DialogHeader>
      <div class="py-4 flex flex-col gap-4">
        <p>
          Manikure Studio is a tool to help you create and edit Kubernetes manifests more easily.
        </p>
        <ul class="space-y-2 list-disc pl-6">
          <li>Use the left-hand panel to manage your resources</li>
          <li>Click "Add from Gallery" to try pre-made templates</li>
          <li>Edit resources using the form in the centre panel</li>
          <li>View the YAML output in the right panel</li>
          <li>Click Copy All to copy all resources as YAML</li>
        </ul>
        <p>
          Thanks for trying out the app. Please share feedback or issues by clicking the <strong>GitHub</strong> link in the app.
        </p>
        <div class="flex rounded-md bg-muted p-4 items-center gap-4">
          <div class="flex-none">
            <CloudOff/>
          </div>
          <p>
            This app runs entirely in your web browser. Your data is completely private to you, and is not shared with any server.
          </p>
        </div>

      </div>
      <DialogFooter>
        <Button @click="handleDismiss">
          Get started
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
