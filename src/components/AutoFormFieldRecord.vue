<script setup lang="ts">
import type { FieldProps } from '@/components/ui/auto-form/interface'
import { FormControl, FormDescription, FormField, FormItem, FormMessage } from '@/components/ui/form'
import AutoFormLabel from '@/components/ui/auto-form/AutoFormLabel.vue'
import { beautifyObjectName } from '@/components/ui/auto-form/utils'
import RecordEditor from "@/components/RecordEditor.vue";

defineProps<FieldProps>()

</script>

<template>
  <!-- v-slot="slotProps" defines a default 'slot' and any props received will be accessible in the 'slotProps' object -->
  <!-- This template also receives props defined in type FieldProps, i.e. fieldName, label, required, etc. -->
  <FormField v-slot="slotProps" :name="fieldName">
    <FormItem>
      <AutoFormLabel v-if="!config?.hideLabel" :required="required">
        {{ config?.label || beautifyObjectName(label ?? fieldName) }}
      </AutoFormLabel>
      <FormControl>
        <!-- Default slot that can be overridden by parent component -->
        <!-- v-bind="slotProps" allows any props received in this component's slot to be accessed in the fragment below -->
        <slot v-bind="slotProps">
          <component :is="RecordEditor" v-bind="{ modelValue: slotProps.componentField.modelValue }" />
        </slot>
      </FormControl>
      <FormDescription v-if="config?.description">
        {{ config.description }}
      </FormDescription>
      <FormMessage />
    </FormItem>
  </FormField>
</template>
