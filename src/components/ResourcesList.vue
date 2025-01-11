<script setup lang="ts">
import { Button } from "@/components/ui/button";
import type {Resource} from "@/types/resource.ts";
import { X } from "lucide-vue-next";
import TemplateDialog from "@/components/TemplateDialog.vue";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

defineProps<{
  resources: Resource[];
  selectedResourceId: number | null;
}>();

defineEmits<{
  (e: 'select', id: number): void
  (e: 'removeResource', id: number): void
  (e: 'clearAll'): void
  (e: 'addResource', resources: Resource[]): void
}>();
</script>

<template>
  <div class="lg:flex lg:flex-col justify-between">
    <div class="lg:flex-auto overflow-y-auto">
      <div class="flex justify-between items-center px-4 py-3 border-b">
        <h3 class="font-medium">Resources</h3>
        <TemplateDialog @select="(resources) => $emit('addResource', resources)" />
      </div>
      
      <div 
        v-for="resource in resources" 
        :key="resource.id"
        class="flex items-center justify-between px-4 py-3 cursor-pointer"
        :class="{'bg-accent': resource.id === selectedResourceId}"
        @click="$emit('select', resource.id)"
      >
        <div>
          <p class="font-medium">{{ resource.metadata?.name || 'Unnamed' }}</p>
          <p class="text-sm text-muted-foreground">{{ resource.kind }}</p>
        </div>
        <Button 
          variant="ghost"
          size="sm"
          @click.stop="$emit('removeResource', resource.id)"
        >
          <X class="size-4" />
        </Button>
      </div>

      <div v-if="!resources.length" class="p-4 text-muted-foreground text-center">
        <p><strong>Empty project</strong></p>
        <p>You can add resources to the project by clicking <em>Add from Gallery</em>.</p>
      </div>
    </div>

    <!-- Bottom menu -->
    <div class="p-4 border-t mt-auto">
      <AlertDialog>
        <AlertDialogTrigger as-child>
          <Button variant="destructive" class="w-full">
            Delete All
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will remove all resources from your current project. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction @click="$emit('clearAll')">Delete All</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  </div>
</template>
