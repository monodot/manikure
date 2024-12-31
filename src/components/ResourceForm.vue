<script setup lang="ts">
import {AutoForm} from "@/components/ui/auto-form";
import {watch} from "vue";
import {useForm} from "vee-validate";
import type {Resource} from "@/types/resource.ts";
import * as z from "zod";

const props = defineProps<{
  modelValue: Resource
}>();

const emit = defineEmits(['update:modelValue']);

// TODO: Reinstate this bit, to load the schema dynamically
// const schema = computed(() => schemas[props.type]);
const schema = z.object({
  kind: z.string().describe("Kind"),
  apiVersion: z.string().describe("API Version"),
  metadata: z.object({
    name: z.string().describe("Name"),
  }).describe("Metadata"),
});

const form = useForm({
  keepValuesOnUnmount: true, // when this is set to false, navigating away from the component destroys the form values
  initialValues: props.modelValue,
});

// Compare objects deeply to prevent unnecessary updates
const isEqual = (obj1: any, obj2: any) => {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
};

// Watch for updates to the modelValue prop, and update the form values
// This happens whenever the parent changes the resource
watch(
    () => props.modelValue,
    (newValue) => {
      if (!isEqual(newValue, form.values)) {
        form.resetForm({ values: newValue });
      }
      console.debug('Form reset with new values');
    }
);

// Watch for updates to form values, and emit an event with the entire updated object
// The parent component can then replace the old object with the new one
watch(
    () => form.values,
    (newValues) => {
      if (newValues && !isEqual(newValues, props.modelValue)) {
        emit('update:modelValue', { ...newValues }); // use the spread operator (...) to create a new object reference; basically a shallow copy
      }
    },
    { deep: true }
);

</script>

<template>
  <div class="p-4">
    <h1>{{ modelValue.metadata.name }}</h1>
    <hr/>

    <AutoForm
        class="w-full space-y-6"
        :form="form"
        :schema="schema"
    />
  </div>
</template>
