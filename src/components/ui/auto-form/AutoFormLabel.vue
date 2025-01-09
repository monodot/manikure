<script setup lang="ts">
import {FormLabel} from '@/components/ui/form'
import {HoverCard, HoverCardTrigger, HoverCardContent} from "@/components/ui/hover-card";
import {InfoIcon} from "lucide-vue-next";
import type {FieldDocumentation} from "@/types/field.ts";

defineProps<{
  required?: boolean,
  documentation?: FieldDocumentation
}>()
</script>

<template>
  <FormLabel>
    <slot/>
    <span v-if="required" class="text-destructive"> *</span>
    <span v-if="documentation">
      <HoverCard :open-delay="25" :close-delay="50">
        <HoverCardTrigger>
          <InfoIcon class="w-4 h-4 text-gray-500 inline ml-1"/>
        </HoverCardTrigger>
        <HoverCardContent class="w-80">
          <div class="space-y-4">
            <p class="text-sm">{{ documentation.details }}</p>
            <div v-if="documentation.links" class="space-y-2">
              <h4 class="text-sm font-semibold">
                Additional Resources
              </h4>
              <ul class="list-disc list-inside space-y-1 text-sm">
                <li v-for="link in documentation.links">
                  <a :href="link.url" class="font-medium text-primary underline underline-offset-4" target="_blank">{{ link.title }}</a>
                </li>
              </ul>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    </span>
  </FormLabel>
</template>
