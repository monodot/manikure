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
      <TmpUserEditor
          v-if="selectedUser"
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

const users = ref([
  { id: 1, name: "John Doe", email: "john@example.com", role: "user" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "admin" },
]);
// const users = ref([
//   { id: 1, kind: "Deployment", manifest: { apiVersion: "apps/v1", kind: "Deployment", metadata: { name: "my-app"} } },
//   { id: 2, kind: "Service", manifest: { apiVersion: "v1", kind: "Service", metadata: { name: "my-service"} } },
// ])
const selectedUserId = ref<number | null>(null);

const selectedUser = computed(() => {
  return users.value.find((user) => user.id === selectedUserId.value) || null;
})

// Receives a whole updated user object, and replaces the old one
const updateUser = (updatedUser: { id: number; name: string; email: string; role: string }) => {
  const index = users.value.findIndex(user => user.id === updatedUser.id);
  if (index !== -1) {
    users.value[index] = updatedUser;
  }
};

</script>
