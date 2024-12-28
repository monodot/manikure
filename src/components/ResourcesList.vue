<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-vue-next";
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

interface Resource {
  id: string;
  type: string;
  values: Record<string, any>;
}

const props = defineProps<{
  resources: Resource[];
  activeResourceId: string;
}>();

const emit = defineEmits<{
  (e: "update:activeResourceId", id: string): void;
  (e: "addResource", type: string): void;
  (e: "removeResource", id: string): void;
  (e: "clearAll"): void;
}>();
</script>

<template>
  <div class="lg:flex lg:flex-col w-[200px] border-r">
    <div class="p-4 lg:flex-auto lg:w-auto h-0 overflow-y-auto space-y-4">
      <div class="flex justify-between items-center mb-4">
        <h3 class="font-medium">Resources</h3>
        <Button variant="ghost" size="sm" @click="emit('addResource', 'Deployment')">
          <PlusCircle class="size-4" />
        </Button>
      </div>
      
      <div 
        v-for="resource in resources" 
        :key="resource.id"
        @click="emit('update:activeResourceId', resource.id)"
        class="flex items-center justify-between p-2 rounded cursor-pointer"
        :class="{'bg-accent': activeResourceId === resource.id}"
      >
        <div>
          <p class="font-medium">{{ resource.values.metadata?.name || 'Unnamed' }}</p>
          <p class="text-sm text-muted-foreground">{{ resource.type }}</p>
        </div>
        <Button 
          v-if="resources.length > 1"
          variant="ghost" 
          size="sm"
          @click.stop="emit('removeResource', resource.id)"
        >
          ×
        </Button>
      </div>
    </div>

    <!-- Clear All Button -->
    <div class="p-4 border-t mt-auto">
      <AlertDialog>
        <AlertDialogTrigger as-child>
          <Button variant="destructive" size="sm" class="w-full">
            Clear All
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
            <AlertDialogAction @click="emit('clearAll')">Clear All</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  </div>
</template>
