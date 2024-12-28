<script setup lang="ts">
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Bird,
  Book,
  Bot,
  Clipboard,
  Code2,
  CornerDownLeft,
  LifeBuoy,
  Mic,
  Paperclip,
  Rabbit,
  Settings,
  Settings2,
  Share,
  SquareTerminal,
  SquareUser,
  Triangle,
  Turtle,
} from "lucide-vue-next";

import ResourceForm from "./ResourceForm.vue";
import CodeViewer from "./CodeViewer.vue";
import { ref } from "vue";

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
  <div class="grid h-screen w-full">
    <!-- Main canvas -->
    <div class="flex flex-col">
      <header
        class="sticky top-0 z-10 flex justify-between h-[60px] items-center gap-1 border-b bg-background px-4"
      >
        <h1 class="text-xl font-semibold">Manikure</h1>

        <!-- Buttons -->
        <div>
          <Button variant="outline" size="sm" class="ml-auto gap-1.5 text-sm">
            <Clipboard class="size-3.5" />
            Copy
          </Button>
        </div>
      </header>

      <main
        class="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3"
      >
        <ResourceForm
          :initial-values="defaultValues"
          @update:values="formValues = $event"
        />

        <div
          class="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2"
        >
          <Badge variant="outline" class="absolute right-3 top-3">
            Output
          </Badge>
          <CodeViewer :code="formValues" />
        </div>
      </main>
    </div>
  </div>
</template>
