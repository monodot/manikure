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
          command: z.array(z.string()).optional().describe("Container entrypoint command"),
          env: z.array(z.object({
            name: z.string(),
            value: z.string(),
          }).optional().describe("Environment variable")),
          ports: z.array(z.object({
            containerPort: z.number(),
            name: z.string().optional(),
            protocol: z.enum(["TCP", "UDP", "SCTP"]).optional(),
          }).optional().describe("Port")),
        }).describe("Container")).describe("List of containers"),
      }).describe("Pod specification"),
    }).describe("Pod template"),
  }).describe("Specification"),
});

export const deploymentFieldConfig = {
    metadata: {
        name: {
            documentation: {
                details: "Name must be unique within a namespace. Is required when creating resources, although some resources may allow a client to request the generation of an appropriate name automatically. Name is primarily intended for creation idempotence and configuration definition. Cannot be updated once the resource has been created in the cluster.",
                links: [
                    {url: "https://kubernetes.io/docs/concepts/overview/working-with-objects/names", title: "Names"}
                ],
            },
        },
    },
    spec: {
        selector: {
            matchLabels: {
                documentation: {
                    details: "These labels are used to select the pods managed by the deployment.",
                    links: [
                        {
                            url: "https://kubernetes.io/docs/concepts/overview/working-with-objects/labels",
                            title: "Labels"
                        }
                    ]
                }
            }
        },
        template: {
            spec: {
                containers: {
                    command: {}
                }
            }
        }
    }
};
