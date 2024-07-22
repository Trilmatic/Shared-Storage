<script setup lang="ts">
import ChevronRight from './icons/ChevronRight.vue'
import FileUploader from './FileUploader.vue'
import { useDiskManager } from '../hooks/diskManager'
import { useFileUploader } from '@/hooks/fileUploader'

const { disk } = useDiskManager()
const { path, moveUpFolder } = useFileUploader()
</script>
<template>
  <section class="flex items-center gap-2 p-4 h-16">
    <div class="text-2xl">
      <p>{{ disk?.name }}</p>
    </div>
    <ChevronRight />
    <div class="flex items-center text-sm" v-for="p in path" :key="p.id">
      <button @click="moveUpFolder(p.id)">{{ p.name }}</button>
      <ChevronRight />
    </div>

    <FileUploader />
  </section>
</template>
