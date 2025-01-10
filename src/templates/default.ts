export const resources = [
  {
    id: 1,
    apiVersion: "apps/v1",
    kind: "Deployment",
    metadata: {
      name: "default-app",
      labels: {
        app: "default-app",
        environment: "dev",
      },
    },
    spec: {
      replicas: 3,
      selector: {
        matchLabels: {
          app: "default-app",
        },
      },
      template: {
        metadata: {
          labels: {
            app: "default-app",
          },
        },
        spec: {
          containers: [
            {
              name: "default-app",
              image: "docker.io/library/python:3.9-slim",
              command: ["python", "-m", "http.server", "8080"],
              env: [
                {
                  name: "SERVER_PORT",
                  value: "8080",
                },
              ],
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
  {
    id: 2,
    apiVersion: "v1",
    kind: "Service",
    metadata: {
      name: "default-service",
    },
    spec: {
      selector: {
        app: "default-app",
      },
      ports: [
        {
          port: 8080,
          targetPort: 8080,
        },
      ],
      type: "ClusterIP",
    },
  },
];
