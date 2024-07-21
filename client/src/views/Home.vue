<script setup lang="ts">
import { ref } from 'vue'
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-folder-plus"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 19h-7a2 2 0 0 1 -2 -2v-11a2 2 0 0 1 2 -2h4l3 3h7a2 2 0 0 1 2 2v3.5" />
            <path d="M16 19h6" />
            <path d="M19 16v6" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>
