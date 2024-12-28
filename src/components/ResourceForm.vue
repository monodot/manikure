<script setup lang="ts">
import { AutoForm, AutoFormField } from "@/components/ui/auto-form";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { h } from "vue";
import * as z from "zod";
import { useForm } from "vee-validate";

enum Sports {
  Football = "Football/Soccer",
  Basketball = "Basketball",
  Baseball = "Baseball",
  Hockey = "Hockey (Ice)",
  None = "I don't like sports",
}

enum ResourceTypes {
  // For native enums, you can alternatively define a backed enum to set a custom label
  Deployment = "Deployment",
}

const schema = z.object({
  // kind: z.nativeEnum(ResourceTypes),

  metadata: z.object({
    name: z.string().describe("Name"),
  }),

  spec: z.object({
    replicas: z.coerce
      .number({
        invalid_type_error: "Replicas must be a number.",
      })
      .default(1),

    containers: z
      .array(
        z
          .object({
            name: z.string(),
            image: z.string(),

            ports: z
              .array(
                z
                  .object({
                    containerPort: z.number(),
                  })
                  .describe("Port")
              )
              .describe("Ports"),
          })
          .describe("Container")
      )
      .describe("Containers"),

    initContainers: z
      .array(
        z.object({
          name: z.string(),
          image: z.string(),
        })
      )
      .describe("Init containers"),
  }),
});

const props = defineProps<{
  initialValues?: Record<string, any>;
}>();

const emit = defineEmits<{
  (e: "update:values", values: Record<string, any>): void;
}>();

function onSubmit(values: Record<string, any>) {
  emit("update:values", values);
}

const form = useForm({
  validationSchema: schema,
  initialValues: props.initialValues,
});
</script>

<template>
  <div>
    <h2
      class="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
    >
      Deployment
    </h2>
    <AutoForm
      class="w-full space-y-6"
      :form="form"
      :schema="schema"
      :default-values="initialValues"
      :field-config="{
        metadata: {
          description: 'eh',
          name: {
            description: 'Must be unique for this kind',
          },
        },
        spec: {
          replicas: {
            description:
              'How many instances of this application should be running',
          },
          containers: {
            image: {
              description: 'e.g. image:tag',
              inputProps: {
                placeholder: 'docker.io/library/nginx:latest',
              },
            },
          },
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
  </div>
</template>
