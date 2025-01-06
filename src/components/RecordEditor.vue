<script setup lang="ts">
import {ref} from "vue";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {X} from "lucide-vue-next";

export interface RecordEditorProps {
  modelValue: Record<string, string>;
}

const props = defineProps<RecordEditorProps>();

const newKey = ref<string>('');
const newValue = ref<string>('');

const deletePair = (key: string): void => {
  delete props.modelValue[key];
}

const addPair = (): void => {
  if (newKey.value && newValue.value) {
    props.modelValue[newKey.value] = newValue.value;
    newKey.value = '';
    newValue.value = '';
  }
}

</script>

<template>
  <div>
    <div v-for="(_value, key) in modelValue" :key="key" class="flex gap-2 items-center my-2">
      <Input :default-value="key"
             class="flex-1"
             :disabled="true" />
      <Input v-model="modelValue[key]"
             class="flex-1" />

      <Button variant="secondary" @click="deletePair(key)" size="icon">
        <X class="w-4 h-4"/>
      </Button>
    </div>
    <div class="flex gap-2 items-center">
      <Input v-model="newKey" class="flex-1"/>
      <Input v-model="newValue" class="flex-1"/>
      <Button variant="secondary" @click="addPair" class="w-20">Add</Button>
    </div>
  </div>
</template>

