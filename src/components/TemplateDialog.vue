<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {ref} from "vue";
import {Button} from "@/components/ui/button";
import {PlusCircle} from "lucide-vue-next";
import type {Resource} from "@/types/resource.ts";

const templates = [
  {
    name: "Basic Web App",
    description: "A simple web application with a frontend container exposed to the internet",
    resources: [
      {
        apiVersion: "apps/v1",
        kind: "Deployment",
        metadata: {
          name: "frontend",
          labels: {
            app: "frontend"
          }
        },
        spec: {
          replicas: 1,
          selector: {
            matchLabels: {
              app: "frontend"
            }
          },
          template: {
            metadata: {
              labels: {
                app: "frontend"
              }
            },
            spec: {
              containers: [
                {
                  name: "nginx",
                  image: "nginx:1.25",
                  ports: [
                    {
                      containerPort: 80
                    }
                  ]
                }
              ]
            }
          }
        }
      },
      {
        apiVersion: "v1",
        kind: "Service",
        metadata: {
          name: "frontend-svc"
        },
        spec: {
          selector: {
            app: "frontend"
          },
          ports: [
            {
              port: 80,
              targetPort: 80
            }
          ]
        }
      },
      {
        apiVersion: "networking.k8s.io/v1",
        kind: "Ingress",
        metadata: {
          name: "frontend-ingress"
        },
        spec: {
          rules: [
            {
              http: {
                paths: [
                  {
                    path: "/",
                    pathType: "Prefix",
                    backend: {
                      service: {
                        name: "frontend-svc",
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
    ]
  },
  {
    name: "Microservices Demo",
    description: "A two-tier application with separate frontend and backend services",
    resources: [
      {
        apiVersion: "apps/v1",
        kind: "Deployment",
        metadata: {
          name: "frontend",
        },
        spec: {
          replicas: 2,
          selector: {
            matchLabels: {
              app: "frontend"
            }
          },
          template: {
            metadata: {
              labels: {
                app: "frontend"
              }
            },
            spec: {
              containers: [
                {
                  name: "frontend",
                  image: "nginx:1.25",
                  env: [
                    {
                      name: "NODE_ENV",
                      value: "production"
                    },
                    {
                      name: "API_URL",
                      value: "http://backend-svc:3000"
                    },
                    {
                      name: "LOG_LEVEL",
                      value: "info"
                    }
                  ],
                  ports: [
                    {
                      containerPort: 80
                    }
                  ]
                }
              ]
            }
          }
        }
      },
      {
        apiVersion: "apps/v1",
        kind: "Deployment",
        metadata: {
          name: "backend",
          labels: {
            app: "backend"
          }
        },
        spec: {
          replicas: 2,
          selector: {
            matchLabels: {
              app: "backend"
            }
          },
          template: {
            metadata: {
              labels: {
                app: "backend"
              }
            },
            spec: {
              containers: [
                {
                  name: "backend",
                  image: "node:18-alpine",
                  env: [
                    {
                      name: "NODE_ENV",
                      value: "production"
                    },
                    {
                      name: "DATABASE_URL",
                      value: "postgresql://dbuser:dbpass@postgres-svc:5432/myapp"
                    },
                    {
                      name: "REDIS_URL",
                      value: "redis://redis-svc:6379"
                    },
                    {
                      name: "JWT_SECRET",
                      valueFrom: {
                        secretKeyRef: {
                          name: "app-secrets",
                          key: "jwt-secret"
                        }
                      }
                    }
                  ],
                  ports: [
                    {
                      containerPort: 3000
                    }
                  ]
                }
              ]
            }
          }
        }
      },
      {
        apiVersion: "v1",
        kind: "Service",
        metadata: {
          name: "frontend-svc"
        },
        spec: {
          selector: {
            app: "frontend"
          },
          ports: [
            {
              port: 80,
              targetPort: 80
            }
          ]
        }
      },
      {
        apiVersion: "v1",
        kind: "Service",
        metadata: {
          name: "backend-svc"
        },
        spec: {
          selector: {
            app: "backend"
          },
          ports: [
            {
              port: 3000,
              targetPort: 3000
            }
          ]
        }
      },
      {
        apiVersion: "networking.k8s.io/v1",
        kind: "Ingress",
        metadata: {
          name: "app-ingress",
          annotations: {
            "nginx.ingress.kubernetes.io/rewrite-target": "/$2"
          }
        },
        spec: {
          rules: [
            {
              http: {
                paths: [
                  {
                    path: "/()(.*)",
                    pathType: "Prefix",
                    backend: {
                      service: {
                        name: "frontend-svc",
                        port: {
                          number: 80
                        }
                      }
                    }
                  },
                  {
                    path: "/api(/|$)(.*)",
                    pathType: "Prefix",
                    backend: {
                      service: {
                        name: "backend-svc",
                        port: {
                          number: 3000
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
    ]
  },
  {
    name: "Production Ready Web",
    description: "A production-grade web deployment with health checks, resource limits, and custom domains",
    resources: [
      {
        apiVersion: "apps/v1",
        kind: "Deployment",
        metadata: {
          name: "web",
          labels: {
            app: "web"
          }
        },
        spec: {
          replicas: 3,
          selector: {
            matchLabels: {
              app: "web"
            }
          },
          template: {
            metadata: {
              labels: {
                app: "web"
              }
            },
            spec: {
              containers: [
                {
                  name: "web",
                  image: "nginx:1.25",
                  resources: {
                    limits: {
                      cpu: "500m",
                      memory: "512Mi"
                    },
                    requests: {
                      cpu: "200m",
                      memory: "256Mi"
                    }
                  },
                  ports: [
                    {
                      containerPort: 80
                    }
                  ],
                  livenessProbe: {
                    httpGet: {
                      path: "/healthz",
                      port: 80
                    },
                    initialDelaySeconds: 3,
                    periodSeconds: 3
                  },
                  readinessProbe: {
                    httpGet: {
                      path: "/ready",
                      port: 80
                    },
                    initialDelaySeconds: 5,
                    periodSeconds: 5
                  }
                }
              ]
            }
          }
        }
      },
      {
        apiVersion: "v1",
        kind: "Service",
        metadata: {
          name: "web-svc",
          annotations: {
            "prometheus.io/scrape": "true",
            "prometheus.io/port": "80"
          }
        },
        spec: {
          selector: {
            app: "web"
          },
          ports: [
            {
              port: 80,
              targetPort: 80
            }
          ]
        }
      },
      {
        apiVersion: "networking.k8s.io/v1",
        kind: "Ingress",
        metadata: {
          name: "web-ingress",
          annotations: {
            "cert-manager.io/cluster-issuer": "letsencrypt-prod",
            "kubernetes.io/tls-acme": "true"
          }
        },
        spec: {
          tls: [
            {
              hosts: ["example.com"],
              secretName: "example-tls"
            }
          ],
          rules: [
            {
              host: "example.com",
              http: {
                paths: [
                  {
                    path: "/",
                    pathType: "Prefix",
                    backend: {
                      service: {
                        name: "web-svc",
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

    ]
  },
];

const isOpen = ref(false);
const selectedTemplate = ref<typeof templates[0] | null>(null);

const emit = defineEmits<{
  (e: "select", resources: Resource[]): void;
}>();

const handleSelect = (template: typeof templates[0]) => {
  selectedTemplate.value = template;
};

const handleSubmit = () => {
  if (selectedTemplate.value) {
    console.log(selectedTemplate.value.resources);
    emit("select", selectedTemplate.value.resources);
    isOpen.value = false;
    selectedTemplate.value = null;
  }
};
</script>

<template>
  <Dialog v-model:open="isOpen">
    <DialogTrigger as-child>
      <Button variant="outline" class="gap-1.5">
        <PlusCircle class="size-4"/>
        Add from Gallery
      </Button>
    </DialogTrigger>
    <DialogContent class="p-0 sm:max-w-4xl grid-rows-[auto_minmax(0,1fr)_auto] max-h-[90dvh]">
      <DialogHeader class="p-6">
        <DialogTitle>Template Gallery</DialogTitle>
        <DialogDescription>
          Select a template from the gallery to add to your project.
        </DialogDescription>
      </DialogHeader>
      <div class="py-1 px-6 grid gap-4 overflow-y-auto">
        <div class="grid grid-cols-3 gap-4">
          <div
              v-for="template in templates"
              :key="template.name"
              class="rounded-lg border p-4 hover:bg-accent cursor-pointer"
              @click="handleSelect(template)"
              :class="{ 'ring-2 ring-primary': selectedTemplate?.name === template.name }"
          >
            <div>
              <h4 class="font-medium leading-none">{{ template.name }}</h4>
              <p class="text-sm text-muted-foreground mt-2">
                {{ template.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <DialogFooter class="p-6 items-center">
        <Button @click="handleSubmit" :disabled="!selectedTemplate" class="ml-4">
          Add to Project
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
