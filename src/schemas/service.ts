import * as z from "zod";

export const serviceSchema = z.object({
    metadata: z.object({
        name: z.string().describe("Name"),
        labels: z.record(z.string()).optional().describe("Labels"),
        annotations: z.record(z.string()).optional().describe("Annotations"),
    }),
    spec: z.object({
        selector: z.record(z.string()),
        ports: z.array(
            z.object({
                port: z.number(),
                targetPort: z.number(),
                protocol: z.enum(["TCP", "UDP"]).optional(),
            })
        ),
        type: z.enum(["ClusterIP", "NodePort", "LoadBalancer"]).default("ClusterIP"),
    }),
});
