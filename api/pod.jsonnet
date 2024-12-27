local pod_spec = import '1.28.2/pod.json';

// local curated_pod = pod_spec {
//     properties +: {
//         kind:: null
//     }
// };

local curated_pod = {
    description: pod_spec.description,
    properties: {
        // apiVersion: pod_spec.properties.apiVersion,
        // metadata: {
        //     properties: {
        //         annotations: pod_spec.properties.metadata.properties.annotations
        //     }
        // },
        apiVersion: pod_spec.properties.apiVersion,
        kind: pod_spec.properties.kind,
        metadata: pod_spec.properties.metadata,
        spec: {
            description: pod_spec.properties.spec.description,
            properties: {
                containers: {
                    description: pod_spec.properties.spec.properties.containers.description,
                    items: {
                        description: pod_spec.properties.spec.properties.containers.items.description,
                        properties: {
                            args: pod_spec.properties.spec.properties.containers.items.properties.args,
                            command: pod_spec.properties.spec.properties.containers.items.properties.command,
                            env: pod_spec.properties.spec.properties.containers.items.properties.env,
                            envFrom: pod_spec.properties.spec.properties.containers.items.properties.envFrom,
                            image: pod_spec.properties.spec.properties.containers.items.properties.image,
                            imagePullPolicy: pod_spec.properties.spec.properties.containers.items.properties.imagePullPolicy,
                            livenessProbe: pod_spec.properties.spec.properties.containers.items.properties.livenessProbe,
                            name: pod_spec.properties.spec.properties.containers.items.properties.name,
                            ports: pod_spec.properties.spec.properties.containers.items.properties.ports,
                            readinessProbe: pod_spec.properties.spec.properties.containers.items.properties.readinessProbe,
                            resources: pod_spec.properties.spec.properties.containers.items.properties.resources,
                            volumeMounts: pod_spec.properties.spec.properties.containers.items.properties.volumeMounts

                        }
                    }
                },
                imagePullSecrets: pod_spec.properties.spec.properties.imagePullSecrets,
                restartPolicy: pod_spec.properties.spec.properties.restartPolicy,
                serviceAccountName: pod_spec.properties.spec.properties.serviceAccountName,
                volumes: pod_spec.properties.spec.properties.volumes
            }
        }
    }
};


curated_pod
