<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {ref, watch} from "vue";
import {Button} from "@/components/ui/button";
import {Import} from "lucide-vue-next";
import type {Resource} from "@/types/resource.ts";

const isOpen = ref(false);

const jsonInput = ref("");
const isImportValid = ref(false);
const validationError = ref("");

const emit = defineEmits<{
  (e: "select", resources: Resource[]): void;
}>();

watch(jsonInput, (newValue) => {
  try {
    if (!newValue.trim()) {
      isImportValid.value = false;
      validationError.value = "Please enter some JSON";
      return;
    }
    
    const parsed = JSON.parse(newValue);
    
    if (!Array.isArray(parsed)) {
      isImportValid.value = false;
      validationError.value = "Input must be a JSON array";
      return;
    }
    
    // Basic validation of required K8s fields
    const isValid = parsed.every(resource => 
      resource.apiVersion && 
      resource.kind && 
      resource.metadata?.name
    );
    
    if (!isValid) {
      isImportValid.value = false;
      validationError.value = "All resources must have apiVersion, kind, and metadata.name";
      return;
    }

    isImportValid.value = true;
    validationError.value = "";
  } catch (e) {
    isImportValid.value = false;
    validationError.value = "Invalid JSON format";
  }
});

const handleSubmit = () => {
  try {
    const resources = JSON.parse(jsonInput.value);
    emit("select", resources);
    isOpen.value = false;
    jsonInput.value = ""; // Clear the input after successful import
  } catch (e) {
    console.error("Error parsing JSON:", e);
  }
};
</script>

<template>
  <Dialog v-model:open="isOpen">
    <DialogTrigger as-child>
      <Button variant="outline" size="sm" class="gap-1.5 text-sm">
        <Import class="size-4"/>
        Import
      </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[625px]">
      <DialogHeader>
        <DialogTitle>Import resources from JSON</DialogTitle>
        <DialogDescription>
          Paste your JSON resources here, as a single array, e.g. <code>[{"apiVersion":"v1","kind":"Pod","metadata":{"name":"my-pod"}}]</code>
        </DialogDescription>
      </DialogHeader>
      <div class="grid gap-4 py-4">
        <div class="grid gap-2">
          <textarea
            v-model="jsonInput"
            rows="10"
            placeholder="Paste your Kubernetes JSON here..."
            class="w-full p-2 font-mono text-sm border rounded-md"
          ></textarea>
          <p v-if="validationError" class="text-sm text-red-500">
            {{ validationError }}
          </p>
        </div>
      </div>
      <DialogFooter>
        <Button @click="handleSubmit" :disabled="!isImportValid">
          Import resources
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
