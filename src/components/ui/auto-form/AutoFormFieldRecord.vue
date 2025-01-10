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
  const value = props.fieldName || {}
  if (typeof value !== 'object') return []
  return Object.entries(value).map(([key, value]) => ({
    key,
    value: String(value)
  }))
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
            v-for="(pair, index) in pairs" 
            :key="index" 
            class="flex items-center gap-2"
          >
            <Input
              :model-value="pair.key"
              placeholder="Key"
              class="flex-1"
              :disabled="disabled"
              @update:model-value="(newKey) => {
                const newPairs = [...pairs]
                newPairs[index].key = newKey
                slotProps.componentField.onChange(
                  Object.fromEntries(newPairs.map(p => [p.key, p.value]))
                )
              }"
            />
            <span class="text-muted-foreground">=</span>
            <Input
              :model-value="pair.value"
              placeholder="Value"
              class="flex-1"
              :disabled="disabled"
              @update:model-value="(newValue) => {
                const newPairs = [...pairs]
                newPairs[index].value = newValue
                slotProps.componentField.onChange(
                  Object.fromEntries(newPairs.map(p => [p.key, p.value]))
                )
              }"
            />
            <Button
              type="button"
              variant="destructive"
              size="icon"
              :disabled="disabled"
              @click="() => {
                const newPairs = pairs.filter((_, i) => i !== index)
                slotProps.componentField.onChange(
                  Object.fromEntries(newPairs.map(p => [p.key, p.value]))
                )
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
              const newPairs = [...pairs, { key: '', value: '' }]
              slotProps.componentField.onChange(
                Object.fromEntries(newPairs.map(p => [p.key, p.value]))
              )
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
