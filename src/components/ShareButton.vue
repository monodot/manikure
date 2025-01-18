<script setup lang="ts">
import {ref} from 'vue';
import {Button} from '@/components/ui/button';
import {Share, CopyIcon} from 'lucide-vue-next';
import {Label} from '@/components/ui/label';
import {useToast} from '@/components/ui/toast';
import {Input} from '@/components/ui/input';
import {encodeResources, checkUrlLength} from '@/lib/sharing';
import {Popover, PopoverTrigger, PopoverContent} from "@/components/ui/popover";

const props = defineProps<{
  resources: any[];
  onShare?: () => void;
}>();

const {toast} = useToast();
const showDialog = ref(false);
const copied = ref(false);
const shareUrl = ref<string>('');
const urlTooLong = ref(false);

const generateShareUrl = () => {
  try {
    console.debug('Generating share URL...');
    const encoded = encodeResources(props.resources);
    const baseUrl = `${window.location.origin}${window.location.pathname}`;
    const {valid} = checkUrlLength(baseUrl, encoded);

    urlTooLong.value = !valid;
    shareUrl.value = valid ? `${baseUrl}#${encoded}` : '';

    return valid;
  } catch (err) {
    console.error('Failed to generate share URL:', err);
    return false;
  }
};

const copyToClipboard = async () => {
  if (!shareUrl.value) return;

  try {
    await navigator.clipboard.writeText(shareUrl.value);
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 2000);

    toast({
      description: "Share URL copied to clipboard!",
    });
    showDialog.value = false;
  } catch (err) {
    toast({
      variant: "destructive",
      description: "Failed to copy URL. Please try again.",
    });
  }
};

// Generate URL when dialog opens
const handleDialogOpen = () => {
  console.debug('Dialog opened');
  generateShareUrl();
};
</script>

<template>
  <Popover @update:open="handleDialogOpen">
    <PopoverTrigger as-child>
      <Button
          variant="outline"
          class="h-9 w-9 lg:h-9 lg:w-auto lg:px-4 lg:py-2 gap-1.5"
          :disabled="resources.length === 0"
      >
        <Share/>
        <span class="hidden lg:block">Share</span>
      </Button>
    </PopoverTrigger>
    <PopoverContent align="end" class="w-[520px]">
      <div class="flex flex-col space-y-2 text-center sm:text-left">
        <h3 class="text-lg font-semibold">
          Share project
        </h3>
        <p class="text-sm text-muted-foreground">
          Anyone who has this link will be able to view your resources. Be careful not to share sensitive information.
        </p>
      </div>
      <div class="flex items-center space-x-2 pt-4">
        <div class="grid flex-1 gap-2">
          <Label for="link" class="sr-only">
            Link
          </Label>
          <Input
              id="link"
              read-only
              v-model="shareUrl"
          />
        </div>
        <Button type="submit" size="sm" class="px-3" @click="copyToClipboard">
          <span class="sr-only">Copy</span>
          <CopyIcon class="h-4 w-4" />
        </Button>
      </div>
    </PopoverContent>
  </Popover>

</template>
