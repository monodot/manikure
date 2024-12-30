<template>
  <div class="p-4">
    <div class="flex justify-between items-center mb-4">
      <h3 class="font-medium">Resources</h3>
      <p>ADD</p>
    </div>
    <div
        v-for="user in users"
        :key="user.id"
        class="flex items-center justify-between p-2 rounded cursor-pointer"
        :class="[{ 'bg-accent': user.id === selectedUserId }]"
        @click="$emit('select', user.id)"
    >
      <div>
        <p class="font-medium">{{ user.name }}</p>
        <p class="text-sm text-muted-foreground">{{ user.email }}</p>
      </div>
<!--      <div>-->
<!--        <p class="font-medium">{{ user.manifest.metadata.name }}</p>-->
<!--        <p class="text-sm text-muted-foreground">{{ user.manifest.kind }}</p>-->
<!--      </div>-->
    </div>

  </div>

</template>

<script>
export default {
  props: {
    users: {
      type: Array,
      required: true,
    },
    selectedUserId: {
      type: Number,
      default: null,
    },
  },
  emits: ["select"],
};
</script>
