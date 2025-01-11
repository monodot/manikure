<script setup lang="ts">
import type {FieldProps} from './interface'
import {Button} from '@/components/ui/button'
import {FormControl, FormDescription, FormField, FormItem, FormMessage} from '@/components/ui/form'
import {Input} from '@/components/ui/input'
import {PlusIcon, XIcon} from 'lucide-vue-next'
import AutoFormLabel from './AutoFormLabel.vue'
import {beautifyObjectName} from './utils'

defineProps<FieldProps>()

</script>

<template>
  <FormField v-slot="slotProps" :name="fieldName">
    <FormItem>
      <AutoFormLabel
          v-if="!config?.hideLabel"
          :required="required"
          :documentation="config?.documentation"
      >
        {{ config?.label || beautifyObjectName(label ?? fieldName) }}
      </AutoFormLabel>
      <FormControl>
        <div class="space-y-3">
          <!-- If a model value exists, then we will iterate over the entries of the object, like this: 0=>["key","value"], 1=>... -->
          <div
              v-for="(pair, index) in (slotProps.componentField.modelValue ? Object.entries(slotProps.componentField.modelValue) : [])"
              :key="index"
              class="flex items-center gap-2"
          >
            <Input
                :model-value="pair[0]"
                placeholder="Key"
                class="flex-1"
                :disabled="disabled"
                @update:model-value="(newKey) => {
                // This is a bit ugly and could probably be optimised?
                // Converts the Object to an Array, replaces the key at the current index, and converts it back to an Object.
                // This makes sure that we maintain the order of keys, so the UI doesn't jump around when renaming a key.
                const currentValue = Object.entries(slotProps.componentField.modelValue);
                currentValue[index][0] = newKey.toString();
                const newObject = Object.fromEntries(currentValue);
                slotProps.componentField.onChange(newObject);
              }"
            />
            <span class="text-muted-foreground">=</span>
            <Input
                :model-value="String(pair[1])"
                placeholder="Value"
                class="flex-1"
                :disabled="disabled"
                @update:model-value="(newValue) => {
                const currentValue = Object.entries(slotProps.componentField.modelValue);
                currentValue[index][1] = newValue;
                const newObject = Object.fromEntries(currentValue);
                slotProps.componentField.onChange(newObject);
              }"
            />
            <Button
                type="button"
                variant="secondary"
                size="icon"
                :disabled="disabled"
                @click="() => {
                const currentValue = { ...(slotProps.componentField.modelValue || {}) }
                delete currentValue[pair[0]]
                slotProps.componentField.onChange(currentValue)
              }"
            >
              <XIcon class="h-4 w-4"/>
            </Button>
          </div>

          <Button
              type="button"
              variant="outline"
              class="mt-2"
              :disabled="disabled"
              @click="() => {
              const currentValue = { ...(slotProps.componentField.modelValue || {}) }
              currentValue[''] = ''
              slotProps.componentField.onChange(currentValue)
            }"
          >
            <PlusIcon class="h-4 w-4"/>
            Add
          </Button>
        </div>
      </FormControl>
      <FormDescription v-if="config?.description">
        {{ config.description }}
      </FormDescription>
      <FormMessage/>
    </FormItem>
  </FormField>
</template>
