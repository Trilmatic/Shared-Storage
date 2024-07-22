<script setup lang="ts">
import FilesHeader from '../components/FilesHeader.vue'
import FileList from '../components/FileList.vue'
import SearchInput from '../components/SearchInput.vue'
import { useFileUploader } from '../hooks/fileUploader'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()

const { refresh } = useFileUploader()

onMounted(() => {
  refresh(String(route.params.diskHash))
})
</script>
<template>
  <div class="w-screen h-screen bg-gray-100 flex">
    <div class="w-16 h-screen"></div>
    <div class="w-full flex-1">
      <div class="w-full h-full flex flex-col gap-4 pt-4 pb-8">
        <header class="h-4">
          <div class="flex items-center w-full h-full" v-if="false">
            <SearchInput />
          </div>
        </header>
        <div class="w-full h-full flex-1">
          <div class="w-full h-full flex">
            <section class="bg-white rounded-lg flex-1 w-full h-full">
              <FilesHeader />
              <FileList />
            </section>
            <section class="w-20"></section>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
