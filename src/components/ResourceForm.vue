<script setup lang="ts">
import { AutoForm } from "@/components/ui/auto-form";
import {watch} from "vue";
import { useForm } from "vee-validate";
import type {Resource} from "@/types/resource.ts";
import * as z from "zod";

const props = defineProps<{
  modelValue: Resource
}>();

const emit = defineEmits(['update:modelValue']);

// TODO: Reinstate this bit, to load the schema dynamically
// const schema = computed(() => schemas[props.type]);
const schema = z.object({
  metadata: z.object({
    name: z.string().describe("Name"),
  }).describe("Metadata"),
});

const form = useForm({
  keepValuesOnUnmount: true,
});
form.setValues(props.modelValue);

// Watch for updates to the modelValue prop, and update the form values
// This happens whenever the parent component changes the selected user
watch(
    () => props.modelValue,
    (oldValue, newValue) => {
      // form.setValues(newValue);
      if (oldValue.id !== newValue.id) {
        form.resetForm({
          values: newValue
        });
        console.debug('Changed resource? Form has been reset: ', newValue);
      }
    },
    {deep: true}
);

// Watch for updates to form values, and emit an event with the entire updated object
// The parent component can then replace the old object with the new one
watch(form.values, (newValues) => {
  emit('update:modelValue', newValues);
  console.debug('Emitted event update:modelValue', newValues);
});
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
