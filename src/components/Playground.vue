<script setup lang="ts">
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toast";
import { ref } from "vue";
import ResourceForm from "./ResourceForm.vue";
import CodeViewer from "./CodeViewer.vue";
import TemplateDialog from "./TemplateDialog.vue";
import { useToast } from "@/components/ui/toast/use-toast";
import { Clipboard } from "lucide-vue-next";

const { toast } = useToast();

const copyToClipboard = () => {
  navigator.clipboard.writeText(JSON.stringify(formValues.value, null, 2));
  toast({
    description: "Manifest copied to your clipboard!",
  });
};

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

const formValues = ref(defaultValues);
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
        <TemplateDialog @select="(template) => formValues = template.values" />
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

      <!-- Editor panel -->
      <div class="lg:flex lg:flex-col w-[400px]">
        <div class="p-4 lg:flex-auto lg:w-auto h-0 overflow-y-auto space-y-4">
          <ResourceForm
            :initial-values="defaultValues"
            @update:values="formValues = $event"
          />
        </div>
      </div>

      <!-- Code panel -->
      <div class="lg:flex lg:flex-col flex-1">
        <div class="p-4 lg:flex-auto lg:w-auto h-0 overflow-y-auto space-y-4 bg-muted">
          <Badge variant="outline" class="absolute right-3 top-3">Output</Badge>
          <CodeViewer :code="formValues" />
        </div>
      </div>
    </main>


  </div>
</template>
