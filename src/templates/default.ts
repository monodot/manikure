export const resources = [
  {
    id: 1,
    apiVersion: "apps/v1",
    kind: "Deployment",
    metadata: {
      name: "egg-app",
      labels: {
        app: "egg-app",
        environment: "dev",
      },
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
  {
    id: 2,
    apiVersion: "v1",
    kind: "Service",
    metadata: {
      name: "egg-service",
    },
    spec: {
      selector: {
        app: "egg-app",
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
