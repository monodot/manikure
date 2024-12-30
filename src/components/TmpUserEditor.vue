<template>
  <div class="p-4">
    <h1>{{ modelValue.name }}</h1>
    <hr/>

    <form @submit.prevent>
      <div class="form-group">
        <label>Name:</label>
        <input
          type="text"
          :value="modelValue.name"
          @input="updateField('name', $event.target.value)"
        />
      </div>

      <div class="form-group">
        <label>Email:</label>
        <input
          type="email"
          :value="modelValue.email"
          @input="updateField('email', $event.target.value)"
        />
      </div>

      <div class="form-group">
        <label>Role:</label>
        <select
          :value="modelValue.role"
          @change="updateField('role', $event.target.value)"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps<{
  modelValue: {
    name: string,
    email: string,
    role: string,
  }
}>();

const emit = defineEmits(['update:modelValue']);

const updateField = (field: string, value: string) => {
  emit('update:modelValue', {
    ...props.modelValue,
    [field]: value,
  });
};

// export default {
//   props: {
//     modelValue: {
//       type: Object,
//       required: true,
//     },
//   },
//
//   emits: ["update:modelValue"],
//
//   methods: {
//     updateField(field, value) {
//       this.$emit("update:modelValue", {
//         ...this.modelValue,
//         [field]: value,
//       });
//     },
//   },
// };
</script>
