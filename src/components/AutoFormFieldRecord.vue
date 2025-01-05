<script setup lang="ts">
import type { FieldProps } from '@/components/ui/auto-form/interface'
import { FormControl, FormDescription, FormField, FormItem, FormMessage } from '@/components/ui/form'
import AutoFormLabel from '@/components/ui/auto-form/AutoFormLabel.vue'
import { beautifyObjectName } from '@/components/ui/auto-form/utils'
import {computed} from "vue";
import {Textarea} from "@/components/ui/textarea";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

const props = defineProps<FieldProps>()
const inputComponent = computed(() => props.config?.component === 'textarea' ? Textarea : Input)

const removeRecord = (key: string, modelValue: Record<string, string>) => {
  delete modelValue[key]
}
</script>

<template>
  <FormField v-slot="slotProps" :name="fieldName">
    <FormItem>
      <AutoFormLabel v-if="!config?.hideLabel" :required="required">
        {{ config?.label || beautifyObjectName(label ?? fieldName) }}
      </AutoFormLabel>
      <FormControl>
        <slot v-bind="slotProps">
          <div v-for="(record, key) in slotProps.componentField.modelValue"
          class="flex gap-2 items-center">
            <Input type="text"
                   :default-value="key"
                   @update:model-value="console.debug('key', key)"
                   class="flex-1"
                   :disabled="disabled" />

            <Input type="text"
                   :default-value="record"
                   class="flex-1"
                   :disabled="disabled" />

            <Button variant="destructive" @click="removeRecord(key, slotProps.componentField.modelValue)">Delete record</Button>
          </div>
        </slot>
        <div>
          <Button variant="secondary" @click="() => slotProps.componentField.modelValue['to'] = 'do'">Add record</Button>
        </div>
      </FormControl>
      <FormDescription v-if="config?.description">
        {{ config.description }}
      </FormDescription>
      <FormMessage />
    </FormItem>
  </FormField>
</template>
