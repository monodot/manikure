import * as z from "zod";

export const ingressSchema = z.object({
    metadata: z.object({
        name: z.string().describe("Name"),
        labels: z.record(z.string()).optional().describe("Labels"),
        annotations: z.record(z.string()).optional().describe("Annotations"),
    }),
    spec: z.object({
        tls: z.array(
            z.object({
                hosts: z.array(z.string()).describe("List of hosts"),
                secretName: z.string(),
            }).describe("TLS configuration")
        ).describe("TLS configurations"),
        rules: z.array(
            z.object({
                host: z.string().optional(),
                http: z.object({
                    paths: z.array(
                        z.object({
                            path: z.string(),
                            pathType: z.enum(["Exact", "Prefix", "ImplementationSpecific"]),
                            backend: z.object({
                                service: z.object({
                                    name: z.string(),
                                    port: z.object({
                                        number: z.number(),
                                    }).describe("Port"),
                                }).describe("Service"),
                            }).describe("Backend"),
                        }).describe("Path")
                    ).describe("Paths"),
                }).describe("Rule HTTP Configuration"),
            }).describe("Rule")
        ).describe("Rules"),
    }),
});

export const ingressFieldConfig = {
    spec: {
        tls: {
            hosts: {
                label: "Host name",
                documentation: {
                    details: "List of hosts included in the TLS certificate. The values are domain names.",
                },
            }
        }
    }
}