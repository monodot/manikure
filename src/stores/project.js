import { defineStore } from 'pinia'

export const useProjectStore = defineStore({
  id: 'project', // optional unique id
  state: () => ({
    documents: [
      {
        apiVersion: 'apps/v1',
        kind: 'Deployment',
        metadata: {
          name: 'my-app',
          labels: {
            app: 'my-app-label'
          }
        },
        spec: {
          replicas: 1,
          selector: {
            matchLabels: {
              app: 'my-app-label',
              poopy: 'pigeon'
            }
          },
          strategy: {
            type: 'RollingUpdate'
          },
          template: {
            metadata: {
              labels: {
                app: 'my-app-label',
                poopy: 'pigeon'
              }
            },
            spec: {
              containers: [
                {
                  name: 'my-app',
                  image: 'nginx:latest',
                  env: [
                    {
                      name: 'MY_APP_ENV',
                      value: 'my-app-value'
                    }
                  ],
                  ports: [
                    {
                      containerPort: 80
                    }
                  ]
                }
              ],
              imagePullSecrets: [
                {
                  name: 'my-app-secret'
                },
                {
                  name: 'alternative-image-secret'
                }
              ],
              restartPolicy: 'Always',
            }
          }
        }
      },
      {
        apiVersion: 'v1',
        kind: 'Service',
        metadata: {
          name: 'nginx-service'
        }
      },
      {
        apiVersion: 'networking.k8s.io/v1',
        kind: 'Ingress',
        metadata: {
          name: 'nginx-ingress'
        },
        spec: {
          rules: [
            {
              host: 'my-app.com',
              http: {
                paths: [
                  {
                    path: '/',
                    pathType: 'Prefix',
                    backend: {
                      service: {
                        name: 'nginx-service',
                        port: {
                          number: 80
                        }
                      }
                    }
                  }
                ]
              }
            }
          ]
        }
      }
    ],
    selectedDocument: 0,
    foobartest: {
      cheese: 'brie',
      foo: 'bar',
      sauce: 'tomato',
      mayonnaise: 'false',
      hours: 'lots'
    },
    foobartest2: [
      {
        key: 'cheese',
        value: 'brie',
      },
      {
        key: 'foo',
        value: 'bar',
      },
    ]
  }),
  actions: {
    addDocument(document) {
      this.documents.push(document)
    },
    selectDocument(document) {
      this.selectedDocument = document
    },
    removeDocument(index) {
      this.documents.splice(index, 1)
    }
  }
})
