import {z} from "zod";

export const deploymentSchema = z.object({
  metadata: z.object({
    name: z.string().describe("Name"),
    labels: z.record(z.string()).optional().describe("Labels"),
  }),
  spec: z.object({
    replicas: z.number().default(1),
    selector: z.object({
      matchLabels: z.record(z.string()),
    }).describe("Label selector"),
    template: z.object({
      metadata: z.object({
        labels: z.record(z.string()),
      }),
      spec: z.object({
        containers: z.array(z.object({
          name: z.string(),
          image: z.string(),
          ports: z.array(z.object({
            containerPort: z.number(),
          }).optional().describe("Port")),
        }).describe("Container")).describe("List of containers"),
      }).describe("Pod specification"),
    }).describe("Pod template"),
  }).describe("Specification"),
});

export const deploymentFieldConfig = {
  metadata: {
    name: {
      description: "Must be unique within a namespace.",
    },
  },
};
