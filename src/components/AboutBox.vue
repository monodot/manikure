<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
  DialogHeader
} from "@/components/ui/dialog";
import {VisuallyHidden} from 'radix-vue';
import {ref} from "vue";
import {Button} from "@/components/ui/button";
import {CircleHelp} from "lucide-vue-next";
import logo from "@/assets/logo.png";

const isOpen = ref(false);

</script>

<template>
  <Dialog v-model:open="isOpen">
    <DialogTrigger as-child>
      <Button size="icon" variant="ghost" aria-label="About" title="About">
        <CircleHelp/>
      </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[600px]">
      <VisuallyHidden as-child>
        <DialogHeader>
          <DialogTitle>
            About Manikure
          </DialogTitle>
          <DialogDescription>
            Information about this application
          </DialogDescription>
        </DialogHeader>
      </VisuallyHidden>
      <div class="flex flex-col lg:flex-row  gap-6 items-center">
        <div class="flex-none lg:w-1/3 text-center">
          <img :src="logo" alt="Manikure" class="w-1/2 mx-auto lg:w-full"/>
        </div>
        <div class="text-center lg:text-left">
          <h1 class="text-2xl font-semibold">
            Manikure
            <span class="text-muted-foreground font-thin">%BUILD%</span>
          </h1>
          <p class="text-sm text-muted-foreground">A manifest editor for Kubernetes resources</p>
          <p class="text-sm">
            <a href="https://github.com/monodot/manikure" target="_blank" class="text-primary hover:underline">https://github.com/monodot/manikure</a>
          </p>

          <div class="flex flex-col my-4 text-sm gap-y-2">
            <p>
              Created by <a href="https://tomd.xyz" target="_blank" class="text-primary hover:underline">Tom Donohue</a>.
              <a href="https://bsky.app/profile/monodot.bsky.social" target="_blank"
                 class="text-primary hover:underline">@monodot.bsky.social</a>
            </p>
            <p>
              Released under the terms of the GNU Affero General Public License (AGPL-3.0).
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
