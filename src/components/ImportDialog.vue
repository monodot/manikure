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
import {ref} from "vue";
import {Button} from "@/components/ui/button";
import {Import} from "lucide-vue-next";
import type {Resource} from "@/types/resource.ts";

const isOpen = ref(false);

const isImportValid = ref(true);

const emit = defineEmits<{
  (e: "select", resources: Resource[]): void;
}>();

const handleSubmit = () => {
  emit("select", [ { apiVersion: "apps/v1", kind: "Deployment", metadata: { name: "imported-app" } } ]);
  isOpen.value = false;
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
          Paste your JSON resources here.
        </DialogDescription>
      </DialogHeader>
      <div class="grid gap-4 py-4">
      </div>
      <DialogFooter>
        <Button @click="handleSubmit" :disabled="!isImportValid">
          Add to Project
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
