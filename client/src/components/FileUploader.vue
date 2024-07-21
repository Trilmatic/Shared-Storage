<script setup lang="ts">
import { useFileUploader } from '../hooks/fileUploader'

const { uploadFile } = useFileUploader()

async function triggetUpload(event: Event) {
  const target = <HTMLInputElement>event.target
  await uploadFile(target.files)
}
</script>
<template>
  <div class="w-72 file-uploader text-base">
    <label
      class="transition-colors border border-dashed border-primary rounded-lg p-2 text-sm hover:border-primary-focus hover:cursor-pointer hover:text-primary"
      for="file"
      >Upload
      <input
        id="file"
        @change="(event) => triggetUpload(event)"
        type="file"
        multiple
        class="hidden"
      />
    </label>
  </div>
</template>
