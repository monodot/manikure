local deployment_spec = import '1.28.2/deployment.json';

local curated_deployment = {
    description: deployment_spec.description,
    properties: {
        apiVersion: deployment_spec.properties.apiVersion,
        kind: deployment_spec.properties.kind,
        metadata: deployment_spec.properties.metadata,
        spec: {
            description: deployment_spec.properties.spec.description,
            properties: {
                replicas: deployment_spec.properties.spec.properties.replicas,
                selector: {
                    description: deployment_spec.properties.spec.properties.selector.description,
                    properties: {
                        matchLabels: deployment_spec.properties.spec.properties.selector.properties.matchLabels
                    }
                },
                strategy: deployment_spec.properties.spec.properties.strategy,
                template: {
                    description: deployment_spec.properties.spec.properties.template.description,
                    properties: {
                        spec: {
                            description: deployment_spec.properties.spec.properties.template.properties.spec.description,
                            properties: {
                                containers: {
                                    description: deployment_spec.properties.spec.properties.template.properties.spec.properties.containers.description,
                                    items: {
                                        description: deployment_spec.properties.spec.properties.template.properties.spec.properties.containers.items.description,
                                        properties: {
                                            args: deployment_spec.properties.spec.properties.template.properties.spec.properties.containers.items.properties.args,
                                            command: deployment_spec.properties.spec.properties.template.properties.spec.properties.containers.items.properties.command,
                                            env: deployment_spec.properties.spec.properties.template.properties.spec.properties.containers.items.properties.env,
                                            envFrom: deployment_spec.properties.spec.properties.template.properties.spec.properties.containers.items.properties.envFrom,
                                            image: deployment_spec.properties.spec.properties.template.properties.spec.properties.containers.items.properties.image,
                                            imagePullPolicy: deployment_spec.properties.spec.properties.template.properties.spec.properties.containers.items.properties.imagePullPolicy,
                                            livenessProbe: deployment_spec.properties.spec.properties.template.properties.spec.properties.containers.items.properties.livenessProbe,
                                            name: deployment_spec.properties.spec.properties.template.properties.spec.properties.containers.items.properties.name,
                                            ports: deployment_spec.properties.spec.properties.template.properties.spec.properties.containers.items.properties.ports,
                                            readinessProbe: deployment_spec.properties.spec.properties.template.properties.spec.properties.containers.items.properties.readinessProbe,
                                            resources: deployment_spec.properties.spec.properties.template.properties.spec.properties.containers.items.properties.resources,
                                            restartPolicy: deployment_spec.properties.spec.properties.template.properties.spec.properties.containers.items.properties.restartPolicy,
                                            volumeMounts: deployment_spec.properties.spec.properties.template.properties.spec.properties.containers.items.properties.volumeMounts,
                                            workingDir: deployment_spec.properties.spec.properties.template.properties.spec.properties.containers.items.properties.workingDir

                                        }
                                    }
                                },
                                imagePullSecrets: deployment_spec.properties.spec.properties.template.properties.spec.properties.imagePullSecrets,
                                restartPolicy: deployment_spec.properties.spec.properties.template.properties.spec.properties.restartPolicy,
                                serviceAccountName: deployment_spec.properties.spec.properties.template.properties.spec.properties.serviceAccountName,
                                volumes: deployment_spec.properties.spec.properties.template.properties.spec.properties.volumes
                            }
                        }
                    }
                }
            }
        }
    }
};


curated_deployment
