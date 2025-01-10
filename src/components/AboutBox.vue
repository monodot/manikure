<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogTrigger
} from "@/components/ui/dialog";
import {ref} from "vue";
import {Button} from "@/components/ui/button";
import {CircleHelp} from "lucide-vue-next";
import logo from "@/assets/logo.png";

const isOpen = ref(false);

</script>

<template>
  <Dialog v-model:open="isOpen">
    <DialogTrigger as-child>
      <Button size="icon" variant="ghost">
        <CircleHelp/>
      </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[600px]">
      <div class="flex gap-6 items-center">
        <div class="flex-none w-1/3">
          <img :src="logo" alt="Manikure Studio" class="w-full"/>
        </div>
        <div>
          <h1 class="text-2xl font-semibold">
            Manikure Studio
            <span class="text-muted-foreground font-thin">%BUILD%</span>
          </h1>
          <p class="text-sm text-muted-foreground">A manifest editor for Kubernetes resources</p>
          <div class="flex flex-col my-4 text-sm gap-y-2">
            <p>
              Created by <a href="https://tomd.xyz" target="_blank" class="text-primary hover:underline">Tom Donohue</a>
            </p>
            <p>
              Released under the terms of the GNU Affero General Public License (AGPL-3.0).
            </p>
            <p>
              <a href="https://github.com/monodot/manikure" target="_blank" class="text-primary hover:underline">Get the
                source on GitHub</a>
            </p>
            <p class="text-muted-foreground">
              Contains documentation from <a href="https://kubernetes.io" target="_blank"
                                             class="text-primary hover:underline">Kubernetes</a>,
              &copy; the authors, used under <a href="https://github.com/kubernetes/website/blob/main/LICENSE"
                                                class="text-primary hover:underline">Creative Commons Attribution 4.0
              (CC-BY-4.0)</a>. Contains UI components adapted from <a href="https://www.shadcn-vue.com" target="_blank"
                                                                      class="text-primary hover:underline">shadcn-vue</a>.
            </p>

          </div>
        </div>
      </div>
    </DialogContent>
  </Dialog>
</template>
