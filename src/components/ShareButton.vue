<script setup lang="ts">
import {ref} from 'vue';
import {Button} from '@/components/ui/button';
import {Share, AlertCircle, Clipboard, Check} from 'lucide-vue-next';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {Alert, AlertDescription} from '@/components/ui/alert';
import {Label} from '@/components/ui/label';
import {useToast} from '@/components/ui/toast';

const props = defineProps<{
  resources: any[];
  onShare?: () => void;
}>();

const {toast} = useToast();
const showDialog = ref(false);
const copied = ref(false);
const shareUrl = ref<string>('');
const urlTooLong = ref(false);

// Import these from your sharing utilities
import {encodeResources, checkUrlLength} from '@/lib/sharing';

const generateShareUrl = () => {
  try {
    console.debug('Generating share URL...');
    const encoded = encodeResources(props.resources);
    const baseUrl = `${window.location.origin}${window.location.pathname}`;
    const {valid} = checkUrlLength(baseUrl, encoded);

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
          variant="secondary"
          size="sm"
          class="gap-1.5 text-sm"
          :disabled="resources.length === 0"
      >
        <Share class="size-3.5"/>
        Share
      </Button>
    </DialogTrigger>

    <DialogContent class="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Share project as link</DialogTitle>
        <DialogDescription>
          Your project resources are not stored online. However, anyone with this link will be able to view your project resources.
          Be careful not to share sensitive information, such as inside Secrets.
        </DialogDescription>
      </DialogHeader>

      <div v-if="urlTooLong" class="flex-1">
        <Alert variant="destructive">
          <AlertCircle class="size-4"/>
          <AlertDescription>
            Project is too large to share via URL. Try reducing the number of resources.
          </AlertDescription>
        </Alert>
      </div>
      <div v-else-if="shareUrl" class="flex items-center space-x-2">
        <div class="grid flex-1 gap-2">
          <Label for="link" class="sr-only">
            Link
          </Label>
          <input
              class="flex-1 truncate rounded-md border px-3 py-2 text-sm"
              :value="shareUrl"
              readonly
          />

        </div>
        <Button
            v-if="!urlTooLong && shareUrl"
            variant="outline"
            class="w-32"
            @click="copyToClipboard"
        >
          <template v-if="!copied">
            <Clipboard class="w-4 h-4"/>
            Copy URL
          </template>
          <template v-else>
            <Check class="w-4 h-4"/>
            Copied!
          </template>
        </Button>

      </div>

    </DialogContent>
  </Dialog>
</template>