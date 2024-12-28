<script setup lang="ts">
import { AutoForm, AutoFormField } from "@/components/ui/auto-form";
import { h, watch } from "vue";
import * as z from "zod";
import { useForm } from "vee-validate";

enum ResourceTypes {
  // For native enums, you can alternatively define a backed enum to set a custom label
  Deployment = "Deployment",
};

enum ImagePullPolicyTypes {
  IfNotPresent = "IfNotPresent",
  Always = "Always",
  Never = "Never",
};

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
            imagePullPolicy: z.nativeEnum(ImagePullPolicyTypes),

            env: z.array(
              z.object({
                name: z.string(),
                value: z.string(),
              }).describe("Environment variable")
            ).describe("Environment variables"),

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
        }).describe("Init container")
      )
      .describe("Init containers")
      // .optional(),
  }),
});

const props = defineProps<{
  initialValues?: Record<string, any>;
}>();

const emit = defineEmits<{
  (e: "update:values", values: Record<string, any>): void;
}>();

const form = useForm({
  validationSchema: schema,
  initialValues: props.initialValues,
  keepValuesOnUnmount: true,
});

// Watch for form value changes and emit them
watch(
  () => form.values,
  (newValues) => {
    emit("update:values", newValues);
  },
  { deep: true }
);
</script>

<template>
  <div>
    <h3 class="scroll-m-20 text-2xl font-semibold tracking-tight">
      Deployment
    </h3>
    <AutoForm
      class="w-full space-y-6"
      :form="form"
      :schema="schema"
      :default-values="initialValues"
      :field-config="{
        metadata: {
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
            imagePullPolicy: {
              description: 'When should Kubernetes pull the image from the registry'
            }
          },
        },
      }"
    >
    </AutoForm>
  </div>
</template>
