<template>
  <ResizablePanelGroup direction="horizontal">
    <ResizablePanel :default-size="20">
      <TmpUserList
          :users="users"
          :selectedUserId="selectedUserId"
          @select="selectedUserId = $event"
      />
    </ResizablePanel>

    <ResizableHandle />

    <ResizablePanel :default-size="40">
      <!-- Key is used to force re-rendering of the component when the selected user changes -->
      <TmpUserEditor
          v-if="selectedUser"
          :key="selectedUserId || 0"
          :modelValue="selectedUser"
          @update:modelValue="updateUser"
      />
    </ResizablePanel>

    <ResizableHandle />

    <ResizablePanel :default-size="40">
      <TmpUserCodeViewer
          v-if="selectedUser"
          :user="selectedUser"
      />
    </ResizablePanel>
  </ResizablePanelGroup>

</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import TmpUserList from "@/components/TmpUserList.vue"
import TmpUserEditor from "@/components/TmpUserEditor.vue"
import TmpUserCodeViewer from "@/components/TmpUserCodeViewer.vue"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import type {Resource} from "@/types/resource.ts";

const users = ref([
  { id: 1, name: "John Doe", email: "john@example.com", role: "user" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "admin" },
  { id: 3, name: "Bernard Cribbins", email: "bernard@example.com", role: "user", metadata: { region: "AMER" } },
  { id: 4, name: "Zod", email: "zod@example.com", role: "lord", metadata: { region: "APAC" } },
  { id: 5, name: "Zeinab Badawi", email: "zeinab@channel4.com", role: "user", metadata: { region: "EMEA" } },
]);
// const users = ref<Resource[]>([
//   { id: 1, manifest: { apiVersion: "apps/v1", kind: "Deployment", metadata: { name: "egg-app"} } },
//   { id: 2, manifest: { apiVersion: "apps/v1", kind: "Deployment", metadata: { name: "chicken-app"} } },
// ])
const selectedUserId = ref<number | null>(null);

const selectedUser = computed(() => {
  return users.value.find((user) => user.id === selectedUserId.value) || null;
})

// Receives a whole updated user object, and replaces the old one
// This function is also called whenever a new user is selected (WHY?)
const updateUser = (updatedUser: { id: number; name: string; email: string; role: string }) => {
  const index = users.value.findIndex(user => user.id === updatedUser.id);
  console.log('Users, pre-update:', users.value);
  console.log('Updating object at index', index, 'with', JSON.stringify(updatedUser));
  if (index !== -1) {
    users.value[index] = updatedUser;
  }
  console.log('Users, post-update:', users.value);
};

</script>
