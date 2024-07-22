<script setup lang="ts">
import { ref } from 'vue'
import NewFolder from '@/components/icons/NewFolder.vue'
import { useDiskManager } from '../hooks/diskManager'

const name = ref('')

function submit() {
  if (name.value.length < 3) return
  createDisk(name.value)
}

const { createDisk } = useDiskManager()
</script>
<template>
  <div class="w-screen h-screen bg-gray-100 flex">
    <div class="w-full flex justify-center items-center">
      <div class="flex gap-1 group bg-gray-200 rounded-lg p-2 w-full max-w-96">
        <input
          v-model="name"
          class="bg-gray-200 w-full flex-1 border-none focus:border-none focus:outline-none p-0"
          type="text"
          placeholder="Create new disk"
          @keyup.enter="submit"
        />
        <button
          class="text-primary hover:text-primary-focus hover:bg-white p-1 rounded-lg transition-colors"
          @click="submit"
        >
          <NewFolder />
        </button>
      </div>
    </div>
  </div>
</template>
