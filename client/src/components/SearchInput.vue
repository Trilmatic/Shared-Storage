<script setup lang="ts">
defineEmits(['submit'])
</script>
<template>
  <div class="flex gap-1 group bg-gray-200 rounded-lg p-2 w-full max-w-96">
    <input
      class="bg-gray-200 w-full flex-1 border-none focus:border-none focus:outline-none p-0"
      type="text"
      placeholder="Search"
      @keyup.enter="$emit('submit')"
    />
    <button
      class="text-primary hover:text-primary-focus hover:bg-white p-1 rounded-lg transition-colors"
      @click="$emit('submit')"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="icon icon-tabler icon-tabler-search"
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
        <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
        <path d="M21 21l-6 -6" />
      </svg>
    </button>
  </div>
</template>
