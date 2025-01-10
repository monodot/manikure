<script setup lang="ts">
import type { FieldProps } from './interface'
import { Button } from '@/components/ui/button'
import { FormControl, FormDescription, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { PlusIcon, TrashIcon } from 'lucide-vue-next'
import { computed } from 'vue'
import AutoFormLabel from './AutoFormLabel.vue'
import { beautifyObjectName } from './utils'

const props = defineProps<FieldProps>()

const pairs = computed(() => {
  return []  // Initialize with empty array for new records
})
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
                const currentValue = { ...(slotProps.componentField.modelValue || {}) }
                const oldKey = pair[0]
                const value = currentValue[oldKey]
                delete currentValue[oldKey]
                currentValue[newKey] = value
                slotProps.componentField.onChange(currentValue)
              }"
            />
            <span class="text-muted-foreground">=</span>
            <Input
              :model-value="pair[1]"
              placeholder="Value"
              class="flex-1"
              :disabled="disabled"
              @update:model-value="(newValue) => {
                const currentValue = { ...(slotProps.componentField.modelValue || {}) }
                currentValue[pair[0]] = newValue
                slotProps.componentField.onChange(currentValue)
              }"
            />
            <Button
              type="button"
              variant="destructive"
              size="icon"
              :disabled="disabled"
              @click="() => {
                const currentValue = { ...(slotProps.componentField.modelValue || {}) }
                delete currentValue[pair[0]]
                slotProps.componentField.onChange(currentValue)
              }"
            >
              <TrashIcon class="h-4 w-4" />
            </Button>
          </div>

          <Button
            type="button"
            variant="outline"
            size="sm"
            class="mt-2"
            :disabled="disabled"
            @click="() => {
              const currentValue = { ...(slotProps.componentField.modelValue || {}) }
              currentValue[''] = ''
              slotProps.componentField.onChange(currentValue)
            }"
          >
            <PlusIcon class="mr-2 h-4 w-4" />
            Add Key-Value Pair
          </Button>
        </div>
      </FormControl>
      <FormDescription v-if="config?.description">
        {{ config.description }}
      </FormDescription>
      <FormMessage />
    </FormItem>
  </FormField>
</template>
