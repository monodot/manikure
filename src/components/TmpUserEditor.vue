<template>
  <div class="p-4">
    <h1>{{ modelValue.name }}</h1>
    <hr/>

    <AutoForm
        class="w-full space-y-6"
        :form="form"
        :schema="schema"
    />
  </div>
</template>

<script setup lang="ts">
import {defineProps, defineEmits, watch} from 'vue';
import {AutoForm} from "@/components/ui/auto-form";
import {useForm} from "vee-validate";
import * as z from "zod";

const props = defineProps<{
  modelValue: {
    name: string,
    email: string,
    role: string,
  }
}>();

const emit = defineEmits(['update:modelValue']);

const schema = z.object({
  id: z.string().describe("ID"),
  name: z.string().describe("Name"),
  email: z.string().email().describe("Email"),
  role: z.enum(["user", "admin"]).describe("Role"),

  // id: z.string().describe("ID"),
  // manifest: z.object({
  //   apiVersion: z.string().describe("API Version"),
  //   kind: z.string().describe("Kind"),
  //   metadata: z.object({
  //     name: z.string().describe("Name"),
  //   }).describe("Metadata"),
  // }).describe("Manifest"),
});

const form = useForm({
  keepValuesOnUnmount: true,
});
form.setValues(props.modelValue);

// Watch for updates to the modelValue prop, and update the form values
// This happens whenever the parent component changes the selected user
watch(() => props.modelValue, (newValue) => {
  // form.setValues(newValue);
  form.resetForm({
    values: newValue
  })
  console.debug('Changed user? Form has been reset: ', newValue);
});

// Watch for updates to form values, and emit an event with the entire updated object
// The parent component can then replace the old object with the new one
watch(form.values, (newValues) => {
  emit('update:modelValue', newValues);
  console.debug('Emitted update:modelValue', newValues);
});

</script>
