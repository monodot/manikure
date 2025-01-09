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
    name: "Nginx",
    description: "Nginx web server with Service and Ingress",
    resources: [
      {
        apiVersion: "apps/v1",
        kind: "Deployment",
        metadata: {
          name: "nginx",
        },
        spec: {
          replicas: 1,
          selector: {
            matchLabels: {
              app: "nginx"
            }
          },
          template: {
            metadata: {
              labels: {
                app: "nginx"
              }
            },
            spec: {
              containers: [
                {
                  name: "nginx",
                  image: "docker.io/library/nginx:latest",
                  ports: [{containerPort: 80}],
                },
              ],
            }
          }
        },
      },
      {
        apiVersion: "v1",
        kind: "Service",
        metadata: {
          name: "nginx",
        },
        spec: {
          selector: {
            app: "nginx"
          },
          ports: [
            {
              port: 80,
              targetPort: 80
            }
          ],
          type: "ClusterIP"
        }
      },
      {
        apiVersion: "networking.k8s.io/v1",
        kind: "Ingress",
        metadata: {
          name: "nginx",
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
                        name: "nginx-service",
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
    name: "Redis",
    description: "Redis database with Service",
    resources: [
      {
        apiVersion: "apps/v1",
        kind: "Deployment",
        metadata: {
          name: "redis-deployment",
        },
        spec: {
          replicas: 1,
          selector: {
            matchLabels: {
              app: "redis"
            }
          },
          template: {
            metadata: {
              labels: {
                app: "redis"
              }
            },
            spec: {
              containers: [
                {
                  name: "redis",
                  image: "docker.io/library/redis:latest",
                  ports: [{containerPort: 6379}],
                },
              ],
            }
          }
        },
      },
      {
        apiVersion: "v1",
        kind: "Service",
        metadata: {
          name: "redis-service",
        },
        spec: {
          selector: {
            app: "redis"
          },
          ports: [
            {
              port: 6379,
              targetPort: 6379
            }
          ]
        }
      }
    ]
  },
  {
    name: "Alpine",
    description: "Minimal Alpine Linux container",
    resources: [
      {
        apiVersion: "apps/v1",
        kind: "Deployment",
        metadata: {
          name: "alpine-deployment",
        },
        spec: {
          replicas: 1,
          selector: {
            matchLabels: {
              app: "alpine"
            }
          },
          template: {
            metadata: {
              labels: {
                app: "alpine"
              }
            },
            spec: {
              containers: [
                {
                  name: "alpine",
                  image: "docker.io/library/alpine:latest",
                  command: ["tail", "-f", "/dev/null"],
                },
              ],
            }
          }
        },
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
      <Button variant="secondary" size="sm" class="gap-1.5 text-sm">
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
