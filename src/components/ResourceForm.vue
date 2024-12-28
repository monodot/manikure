<script setup lang="ts">
import { AutoForm } from "@/components/ui/auto-form";
import { watch } from "vue";
import { useForm } from "vee-validate";
import { schemas } from "@/schemas";
import type { ResourceType } from "@/schemas";

const props = defineProps<{
  initialValues?: Record<string, any>;
  type: ResourceType;
}>();

const emit = defineEmits<{
  (e: "update:values", values: Record<string, any>): void;
}>();

const schema = schemas[props.type];

const form = useForm({
  validationSchema: schema,
  initialValues: props.initialValues,
  keepValuesOnUnmount: true,
});

// Watch for changes in initialValues and update form
watch(
  () => props.initialValues,
  (newValues) => {
    console.log(`Receiving new values - ${JSON.stringify(newValues)}`);
    if (newValues) {
      // Reset form with new values
      form.resetForm({
        values: newValues,
      });
    }
  },
  { deep: true }
);

// Watch form values for changes and emit updates
watch(
  () => form.values,
  (newValues) => {
    emit("update:values", newValues);
  },
  { deep: true }
);
</script>

<template>
  <div>
    <h3 class="scroll-m-20 text-2xl font-semibold tracking-tight">
      {{ type }}
    </h3>
    <AutoForm
      class="w-full space-y-6"
      :form="form"
      :schema="schema"
      :default-values="initialValues"
    />
  </div>
</template>
