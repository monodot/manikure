import * as z from "zod";

enum ImagePullPolicyTypes {
  IfNotPresent = "IfNotPresent",
  Always = "Always",
  Never = "Never",
}

export const deploymentSchema = z.object({
  metadata: z.object({
    name: z.string().describe("Name"),
  }),

  spec: z.object({
    replicas: z.coerce
      .number({
        invalid_type_error: "Replicas must be a number.",
      })
      .default(1)
      .optional(),
    
    template: z.object({
      metadata: z.object({
        labels: z.record(z.string()).optional(),
      }),
      
      spec: z.object({
        containers: z
          .array(
            z.object({
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
                  z.object({
                    containerPort: z.number(),
                  }).describe("Port")
                )
                .describe("Ports"),
            }).describe("Container")
          )
          .describe("Containers"),
      }),
    }),
  }),
});

export const deploymentFieldConfig = {
  metadata: {
    name: {
      description: "Must be unique within a namespace.",
    },
  },
};
