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
import { ref } from "vue";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-vue-next";

const templates = [
  {
    name: "Nginx",
    description: "Basic Nginx web server deployment",
    values: {
      apiVersion: "apps/v1",
      kind: "Deployment",
      metadata: {
        name: "nginx-deployment",
      },
      spec: {
        replicas: 1,
        containers: [
          {
            name: "nginx",
            image: "docker.io/library/nginx:latest",
            ports: [{ containerPort: 80 }],
          },
        ],
      },
    },
  },
  {
    name: "Redis",
    description: "Redis database server",
    values: {
      apiVersion: "apps/v1",
      kind: "Deployment",
      metadata: {
        name: "redis-deployment",
      },
      spec: {
        replicas: 1,
        containers: [
          {
            name: "redis",
            image: "docker.io/library/redis:latest",
            ports: [{ containerPort: 6379 }],
          },
        ],
      },
    },
  },
  {
    name: "Alpine",
    description: "Minimal Alpine Linux container with a custom entry command",
    values: {
      apiVersion: "apps/v1",
      kind: "Deployment",
      metadata: {
        name: "alpine-deployment",
      },
      spec: {
        replicas: 1,
        containers: [
          {
            name: "alpine",
            image: "docker.io/library/alpine:latest",
            command: ["tail", "-f", "/dev/null"],
          },
        ],
      },
    },
  },
];

const isOpen = ref(false);
const selectedTemplate = ref<typeof templates[0] | null>(null);

const emit = defineEmits<{
  (e: "select", template: typeof templates[0]): void;
}>();

const handleSelect = (template: typeof templates[0]) => {
  selectedTemplate.value = template;
};

const handleSubmit = () => {
  if (selectedTemplate.value) {
    emit("select", selectedTemplate.value);
    isOpen.value = false;
    selectedTemplate.value = null;
  }
};
</script>

<template>
  <Dialog v-model:open="isOpen">
    <DialogTrigger as-child>
      <Button variant="outline" size="sm" class="gap-1.5 text-sm">
        <PlusCircle class="size-4" />
        New from Template
      </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Choose Template</DialogTitle>
        <DialogDescription>
          Select a template to start with a pre-configured deployment
        </DialogDescription>
      </DialogHeader>
      <div class="grid gap-4 py-4">
        <div
          v-for="template in templates"
          :key="template.name"
          class="flex items-center gap-4 rounded-lg border p-4 hover:bg-accent cursor-pointer"
          @click="handleSelect(template)"
          :class="{ 'ring-2 ring-primary': selectedTemplate?.name === template.name }"
        >
          <div>
            <h4 class="font-medium leading-none">{{ template.name }}</h4>
            <p class="text-sm text-muted-foreground mt-1">
              {{ template.description }}
            </p>
          </div>
        </div>
      </div>
      <DialogFooter>
        <Button @click="handleSubmit" :disabled="!selectedTemplate">
          Clear & Apply Template
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
