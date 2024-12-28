<script setup lang="ts">
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toast";
import { ref } from "vue";
import ResourceForm from "./ResourceForm.vue";
import CodeViewer from "./CodeViewer.vue";
import TemplateDialog from "./TemplateDialog.vue";
import { useToast } from "@/components/ui/toast/use-toast";
import { Clipboard, PlusCircle } from "lucide-vue-next";
import yaml from 'js-yaml';

interface Resource {
  id: string;
  type: string;
  values: Record<string, any>;
}

const { toast } = useToast();

const generateId = () => crypto.randomUUID();

const defaultValues = {
  apiVersion: "apps/v1",
  kind: "Deployment",
  metadata: {
    name: "my-nginx",
  },
  spec: {
    replicas: 1,
    containers: [
      {
        name: "nginx",
        image: "docker.io/library/nginx:latest",
        env: [
            {
                name: "DEBUG",
                value: "true"
            },
            {
                name: "LOG_LEVEL",
                value: "TRACE",
            }
        ],
        ports: [
          {
            containerPort: 80,
          },
        ],
      },
    ],
  },
};

const resources = ref<Resource[]>([{
  id: '1',
  type: 'Deployment',
  values: defaultValues
}]);

const activeResourceId = ref<string>('1');

const copyToClipboard = () => {
  const yamlDocs = resources.value.map(r => yaml.dump(r.values)).join('---\n');
  navigator.clipboard.writeText(yamlDocs);
  toast({
    description: "Resources copied to your clipboard!",
  });
};

const addResource = (type: string) => {
  const id = generateId();
  resources.value.push({
    id,
    type,
    values: {
      apiVersion: "apps/v1",
      kind: type,
      metadata: { name: "" },
      spec: {}
    }
  });
  activeResourceId.value = id;
};

const removeResource = (id: string) => {
  const index = resources.value.findIndex(r => r.id === id);
  resources.value.splice(index, 1);
  if (activeResourceId.value === id) {
    activeResourceId.value = resources.value[0]?.id;
  }
};
</script>

<template>
  <Toaster />
  <div class="flex flex-col min-h-screen">
    <header
      class="sticky top-0 z-10 flex justify-between h-[60px] items-center gap-1 border-b bg-background px-4"
    >
      <h1 class="text-xl font-semibold">Manikure</h1>

      <!-- Buttons -->
      <div class="flex gap-2">
        <TemplateDialog @select="(template) => {
          // Replace all resources with the template resources
          template.forEach((resource, index) => {
            if (index === 0) {
              // Update first resource
              resources[0].type = resource.type;
              resources[0].values = resource.values;
            } else {
              // Add additional resources
              resources.push({
                id: generateId(),
                type: resource.type,
                values: resource.values
              });
            }
          });
          // Set active resource to first one
          activeResourceId = resources[0].id;
        }" />
        <Button
          variant="outline"
          size="sm"
          class="gap-1.5 text-sm"
          @click="copyToClipboard"
        >
          <Clipboard class="size-3.5" />
          Copy
        </Button>
      </div>
    </header>

    <main class="lg:flex lg:flex-1">

      <!-- Resources list -->
      <div class="lg:flex lg:flex-col w-[200px] border-r">
        <div class="p-4 lg:flex-auto lg:w-auto h-0 overflow-y-auto space-y-4">
          <div class="flex justify-between items-center mb-4">
            <h3 class="font-medium">Resources</h3>
            <Button variant="ghost" size="sm" @click="addResource('Deployment')">
              <PlusCircle class="size-4" />
            </Button>
          </div>
          
          <div 
            v-for="resource in resources" 
            :key="resource.id"
            @click="activeResourceId = resource.id"
            class="flex items-center justify-between p-2 rounded cursor-pointer"
            :class="{'bg-accent': activeResourceId === resource.id}"
          >
            <div>
              <p class="font-medium">{{ resource.values.metadata?.name || 'Unnamed' }}</p>
              <p class="text-sm text-muted-foreground">{{ resource.type }}</p>
            </div>
            <Button 
              v-if="resources.length > 1"
              variant="ghost" 
              size="sm"
              @click.stop="removeResource(resource.id)"
            >
              ×
            </Button>
          </div>
        </div>
      </div>

      <!-- Editor panel -->
      <div class="lg:flex lg:flex-col w-[400px]">
        <div class="p-4 lg:flex-auto lg:w-auto h-0 overflow-y-auto space-y-4">
          <ResourceForm
            v-if="activeResourceId"
            :initial-values="resources.find(r => r.id === activeResourceId)?.values"
            @update:values="resources.find(r => r.id === activeResourceId)!.values = $event"
          />
        </div>
      </div>

      <!-- Code panel -->
      <div class="lg:flex lg:flex-col flex-1">
        <div class="p-4 lg:flex-auto lg:w-auto h-0 overflow-y-auto space-y-4 bg-muted">
          <Badge variant="outline" class="absolute right-3 top-3">Output</Badge>
          <CodeViewer :code="resources.map(r => r.values)" />
        </div>
      </div>
    </main>


  </div>
</template>
