<script setup lang="ts">
import ChevronRight from './icons/ChevronRight.vue'
import FileUploader from './FileUploader.vue'
import { useDiskManager } from '../hooks/diskManager'

const { disk } = useDiskManager()
</script>
<template>
  <section class="flex items-center gap-2 text-2xl p-4 h-16">
    <div>
      <p>{{ disk?.name }}</p>
    </div>
    <ChevronRight />
    <FileUploader />
  </section>
</template>
