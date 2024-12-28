<script setup lang="ts">
import { AutoForm, AutoFormField } from "@/components/ui/auto-form";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { h } from "vue";
import * as z from "zod";

enum Sports {
  Football = "Football/Soccer",
  Basketball = "Basketball",
  Baseball = "Baseball",
  Hockey = "Hockey (Ice)",
  None = "I don't like sports",
}

const schema = z.object({
  metadata: z.object({
    name: z.string().describe("Name"),
  }),

  spec: z.object({
    replicas: z.coerce
      .number({
        invalid_type_error: "Replicas must be a number.",
      })
      .default(1),

    containers: z.array(
      z.object({
        name: z.string(),
        image: z.string(),

        ports: z.array(
          z.object({
            containerPort: z.number(),
          })
        ),
      }).describe("Container"),
    ).describe("Containers"),
  }).describe('Specification'),
});

const emit = defineEmits<{
  (e: 'update:values', values: Record<string, any>): void
}>();

function onSubmit(values: Record<string, any>) {
  emit('update:values', values);
}
</script>

<template>
  <AutoForm
    class="w-full space-y-6"
    :schema="schema"
    :field-config="{
      password: {
        label: 'Your secure password',
        inputProps: {
          type: 'password',
          placeholder: '••••••••',
        },
      },
      favouriteNumber: {
        description: 'Your favourite number between 1 and 10.',
      },
      acceptTerms: {
        label: 'Accept terms and conditions.',
        inputProps: {
          required: true,
        },
      },

      birthday: {
        description: 'We need your birthday to send you a gift.',
      },

      sendMeMails: {
        component: 'switch',
      },

      bio: {
        component: 'textarea',
      },

      marshmallows: {
        label: 'How many marshmallows fit in your mouth?',
        component: 'radio',
      },

      file: {
        label: 'Text file',
        component: 'file',
      },
    }"
    @submit="onSubmit"
  >
    <template #acceptTerms="slotProps">
      <AutoFormField v-bind="slotProps" />
      <div class="!mt-2 text-sm">
        I agree to the
        <button class="text-primary underline">terms and conditions</button>.
      </div>
    </template>

    <template #customParent="slotProps">
      <div class="flex items-end space-x-2">
        <AutoFormField v-bind="slotProps" class="w-full" />
        <Button type="button"> Check </Button>
      </div>
    </template>

    <Button type="submit"> Submit </Button>
  </AutoForm>
</template>
