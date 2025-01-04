<script setup lang="ts">
import { ref } from 'vue';
import { Button } from '@/components/ui/button';
import { Share, AlertCircle, Copy, Check } from 'lucide-vue-next';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/components/ui/toast';

const props = defineProps<{
  resources: any[];
  onShare?: () => void;
}>();

const { toast } = useToast();
const showDialog = ref(false);
const copied = ref(false);
const shareUrl = ref<string>('');
const urlTooLong = ref(false);

// Import these from your sharing utilities
import { encodeResources, checkUrlLength } from '@/lib/sharing';

const generateShareUrl = () => {
  try {
    console.debug('Generating share URL...');
    const encoded = encodeResources(props.resources);
    const baseUrl = `${window.location.origin}${window.location.pathname}`;
    const { valid } = checkUrlLength(baseUrl, encoded);

    urlTooLong.value = !valid;
    shareUrl.value = valid ? `${baseUrl}?resources=${encoded}` : '';

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
  <Dialog v-model:open="showDialog" @update:open="handleDialogOpen">
    <DialogTrigger asChild>
      <Button
          variant="outline"
          size="sm"
          class="gap-1.5 text-sm"
          :disabled="resources.length === 0"
      >
        <Share class="size-3.5" />
        Share
      </Button>
    </DialogTrigger>

    <DialogContent class="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Share Project</DialogTitle>
        <DialogDescription>
          Share your Kubernetes resources with others using this URL
        </DialogDescription>
      </DialogHeader>

      <div class="flex items-center space-x-2">
        <div v-if="urlTooLong" class="flex-1">
          <Alert variant="destructive">
            <AlertCircle class="size-4" />
            <AlertDescription>
              Project is too large to share via URL. Try reducing the number of resources.
            </AlertDescription>
          </Alert>
        </div>
        <div v-else-if="shareUrl" class="grid flex-1 gap-4">
          <div class="flex items-center">
            <input
                class="flex-1 truncate rounded-md border px-3 py-2 text-sm"
                :value="shareUrl"
                readonly
            />
          </div>
        </div>
      </div>

      <DialogFooter className="sm:justify-start">
        <Button
            v-if="!urlTooLong && shareUrl"
            type="button"
            variant="secondary"
            size="sm"
            class="gap-1.5"
            @click="copyToClipboard"
        >
          <span v-if="!copied">
            <Copy class="size-3.5" />
            Copy URL
          </span>
          <span v-else>
            <Check class="size-3.5" />
            Copied!
          </span>
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>