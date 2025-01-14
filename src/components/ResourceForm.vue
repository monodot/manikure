<script setup lang="ts">
import {AutoForm} from "@/components/ui/auto-form";
import {computed, watch} from "vue";
import {useForm} from "vee-validate";
import type {Resource} from "@/types/resource.ts";
import {schemas, configs} from "@/schemas";
import type { ResourceType } from "@/schemas";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {CircleAlert} from "lucide-vue-next";

const props = defineProps<{
  modelValue: Resource;
}>();

const emit = defineEmits(['update:modelValue']);

// Load the schema for the current 'Kind' of resource, or a fallback schema
const schema = computed(() => {
  if (props.modelValue.kind in schemas) {
    return schemas[props.modelValue.kind as ResourceType];
  }
  return schemas.default; // Returns a fallback schema if we don't know what this 'Kind' is
})

const fieldConfig = computed(() => {
  if (props.modelValue.kind in configs) {
    return configs[props.modelValue.kind as ResourceType];
  }
  return configs.default;
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
      // console.debug('Form reset with new values');
    }
);

// Watch for updates to form values, and emit an event with the entire updated object
// The parent component can then replace the old object with the new one

/**
 * This is a deep watcher, which means it will watch for changes in nested objects
 *
 * It seems to be executed multiple times, initially with env name/value only visible,
 * then with env.valueFrom, then env.valueFrom.configMapKeyRef, then env.valueFrom.secretKeyRef
 *
 * So there is some sort of progressive rendering happening
 */
watch(
    () => form.values,
    (newValues) => {
      if (newValues && !isEqual(newValues, props.modelValue)) {
        emit('update:modelValue', { ...newValues }); // use the spread operator (...) to create a new object reference; basically a shallow copy
      }
    },
    { deep: true } // This is mandatory, without this setting, any edits you make to the resource are not propagated to the output window
);

</script>

<template>
  <div class="lg:min-w-[400px] p-4 flex-none overflow-y-auto">
    <h1 class="text-lg font-semibold">{{ modelValue.kind }}</h1>
    <hr/>
    <AutoForm
        ref="formRef"
        class="w-full space-y-6"
        :form="form"
        :schema="schema"
        :field-config="fieldConfig"
        v-if="schema.description !== 'Unknown'"
    />
    <div v-else
      class="py-4">
      <Alert>
        <CircleAlert class="h-4 w-4" />
        <AlertTitle>Unsupported resource type</AlertTitle>
        <AlertDescription>
          Oops, we can't show you an edit form here, because we don't currently support this resource type.
          We currently support Deployments, Services and Ingresses.
        </AlertDescription>
      </Alert>
    </div>
  </div>
</template>
