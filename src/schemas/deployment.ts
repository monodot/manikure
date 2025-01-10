import {z} from "zod";

enum PortProtocolTypes {
    TCP = "TCP",
    UDP = "UDP",
    SCTP = "SCTP",
};

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
            }).describe("Pod template metadata"),
            spec: z.object({
                containers: z.array(z.object({
                    name: z.string(),
                    image: z.string(),
                    command: z.array(z.string()).describe("Container entrypoint command"),
                    env: z.array(
                        z.object({
                            name: z.string(),
                            value: z.string().optional(),
                            valueFrom: z.object({
                                configMapKeyRef: z.object({
                                    name: z.string(),
                                    key: z.string(),
                                    optional: z.boolean().optional(),
                                }).optional().describe("Reference to a ConfigMap"),
                                secretKeyRef: z.object({
                                    name: z.string(),
                                    key: z.string(),
                                    optional: z.boolean().optional(),
                                }).optional().describe("Reference to a Secret"),
                            }).optional().describe("Source of the environment variable's value"),
                        }).describe("Environment variable").refine(
                            (data) => !(data.value && data.valueFrom),
                            "Cannot specify both value and valueFrom"
                        )
                    ).describe("Environment variables"),
                    ports: z.array(z.object({
                        containerPort: z.number(),
                        name: z.string().optional(),
                        protocol: z.nativeEnum(PortProtocolTypes).optional(),
                    }).optional().describe("Port")),
                    resources: z.object({
                        requests: z.object({
                            cpu: z.string().optional().describe("CPU request (e.g. '100m', '0.5')"),
                            memory: z.string().optional().describe("Memory request (e.g. '256Mi', '1Gi')"),
                        }).optional().describe("Requests"),
                        limits: z.object({
                            cpu: z.string().optional().describe("CPU limit (e.g. '200m', '1.0')"),
                            memory: z.string().optional().describe("Memory limit (e.g. '512Mi', '2Gi')"),
                        }).optional().describe("Limits"),
                    }).optional().describe("Compute resources"),
                }).describe("Container")).describe("Containers in this pod"),
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
                    command: {},
                    resources: {
                        requests: {
                            documentation: {
                                details: "Describes the minimum amount of compute resources required by this Pod. The kube-scheduler uses this information to decide which node to place the Pod on.",
                                links: [
                                    {
                                        url: "https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/",
                                        title: "Managing Resources for Containers"
                                    }
                                ]
                            },
                            cpu: {
                                inputProps: {
                                    placeholder: "100m, 0.5"
                                },
                            },
                            memory: {
                                inputProps: {
                                    placeholder: "256Mi, 1Gi"
                                }
                            }
                        },
                        limits: {
                            documentation: {
                                details: "When you specify a resource limit for a container, the kubelet enforces those limits so that the running container is not allowed to use more of that resource than the limit you set.",
                                links: [
                                    {
                                        url: "https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/",
                                        title: "Managing Resources for Containers"
                                    }
                                ]
                            },
                            cpu: {
                                inputProps: {
                                    placeholder: "100m, 0.5"
                                },
                            },
                            memory: {
                                inputProps: {
                                    placeholder: "256Mi, 1Gi"
                                }
                            }
                        },
                    }

                }
            }
        }
    }
};
