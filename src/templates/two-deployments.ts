export const resources = [
    {
        id: "1",
        type: "Deployment",
        values: {
            apiVersion: "apps/v1",
            kind: "Deployment",
            metadata: {
                name: "egg-app",
            },
            spec: {
                replicas: 3,
                selector: {
                    matchLabels: {
                        app: "egg-app",
                    },
                },
                template: {
                    metadata: {
                        labels: {
                            app: "egg-app",
                        },
                    },
                    spec: {
                        containers: [
                            {
                                name: "egg-app",
                                image: "docker.io/library/python:3.9-slim",
                                command: ["python", "-m", "http.server", "8080"],
                                ports: [
                                    {
                                        containerPort: 8080,
                                    },
                                ],
                            },
                        ],
                    },
                },
            },
        },
    },
    {
        id: "2",
        type: "Deployment",
        values: {
            apiVersion: "apps/v1",
            kind: "Deployment",
            metadata: {
                name: "chicken-app",
            },
            spec: {
                replicas: 2,
                selector: {
                    matchLabels: {
                        app: "chicken-app",
                    },
                },
                template: {
                    metadata: {
                        labels: {
                            app: "chicken-app",
                        },
                    },
                    spec: {
                        containers: [
                            {
                                name: "chicken-app",
                                image: "docker.io/library/node:14",
                                command: ["node", "server.js"],
                                ports: [
                                    {
                                        containerPort: 3000,
                                    },
                                ],
                            },
                        ],
                    },
                },
            },
        },
    }
];
