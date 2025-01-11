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
import { ref, watch } from "vue";
import { parse as parseYAML } from 'yaml';
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
    
    // Try parsing as JSON first, fall back to YAML
    let parsed;
    try {
      parsed = JSON.parse(newValue);
    } catch {
      parsed = parseYAML(newValue);
    }

    // Convert single object to array
    const resources = Array.isArray(parsed) ? parsed : [parsed];
    
    // If it's a List kind, use its items
    if (parsed.kind === 'List' && Array.isArray(parsed.items)) {
      resources = parsed.items;
    }
    
    // Basic validation of required K8s fields
    const isValid = resources.every(resource => 
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
    let parsed;
    try {
      parsed = JSON.parse(jsonInput.value);
    } catch {
      parsed = parseYAML(jsonInput.value);
    }
    
    const resources = Array.isArray(parsed) ? parsed : [parsed];
    if (parsed.kind === 'List' && Array.isArray(parsed.items)) {
      resources = parsed.items;
    }
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
      <Button variant="outline" class="gap-1.5">
        <Import class="size-4"/>
        Import
      </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[625px]">
      <DialogHeader>
        <DialogTitle>Import resources</DialogTitle>
        <DialogDescription>
          <p>Import your existing resources into this project, in JSON or YAML format. You can paste:</p>
          <ul class="list-disc list-inside space-y-1 mt-2">
            <li>A single Kubernetes resource</li>
            <li>Multiple Kubernetes resources as an array</li>
            <li>A Kubernetes List object</li>
          </ul>
          <p class="mt-2">For example, to get resources from an existing cluster, run this command against your cluster, and then paste the output here:</p>
          <code>kubectl -n NAMESPACE get deploy,svc,ingress -o yaml</code>
        </DialogDescription>
      </DialogHeader>
      <div class="grid gap-4 py-4">
        <div class="grid gap-2">
          <textarea
            v-model="jsonInput"
            rows="10"
            placeholder="Paste your Kubernetes resources in JSON or YAML format..."
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
