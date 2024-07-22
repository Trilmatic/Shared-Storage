<script setup lang="ts">
import { ref } from 'vue'
import { useFileUploader, type File } from '../hooks/fileUploader'
import { formatDateTime, formatFileSize } from '@/utils'
import LoadingList from '@/components/icons/LoadingList.vue'
import Loader from '@/components/icons/Loader.vue'
import NewFolder from '@/components/icons/NewFolder.vue'
import UpStructure from '@/components/icons/UpStructure.vue'
import Folder from '@/components/icons/Folder.vue'
import Download from '@/components/icons/Download.vue'
import { useDiskManager } from '@/hooks/diskManager'

const { disk } = useDiskManager()

const { files, listLoading, uploadLoading, createFolder, openFolder, moveUpFolder, parent } =
  useFileUploader()

const folderName = ref<string>('')

async function newFolder() {
  if (folderName.value.length < 3) return
  await createFolder(folderName.value)
  folderName.value = ''
}

function resolveRowClick(file: File) {
  if (!file.isFolder) return
  openFolder(file)
}
</script>
<template>
  <div class="max-h-[calc(100vh-11rem)] overflow-y-auto">
    <div class="relative overflow-x-auto">
      <table class="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead class="text-xs text-gray-700 uppercase border-b">
          <tr>
            <th scope="col" class="px-6 py-3">Name</th>
            <th scope="col" class="px-6 py-3">Last updated</th>
            <th scope="col" class="px-6 py-3">Size</th>
            <th scope="col" class="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody v-if="listLoading">
          <tr>
            <td class="px-6 py-4" colspan="4">
              <div class="mx-auto w-16 h-16" role="status">
                <LoadingList />
                <span class="sr-only">Loading...</span>
              </div>
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr class="border-b" v-if="uploadLoading">
            <td class="px-6 py-4" colspan="5">
              <div class="w-8 h-8" role="status">
                <Loader />
                <span class="sr-only">Loading...</span>
              </div>
            </td>
          </tr>
          <tr v-if="parent">
            <td
              class="px-6 py-4 border-b hover:bg-gray-200 hover:cursor-pointer"
              colspan="5"
              @click="moveUpFolder()"
            >
              <UpStructure />
            </td>
          </tr>
          <tr class="border-b" v-if="!uploadLoading">
            <td class="px-6 py-4" colspan="4">
              <div class="w-full flex gap-2">
                <button
                  class="text-primary hover:text-white hover:bg-primary disabled:text-gray-300 disabled:bg-transparent transition-colors rounded-lg p-1"
                  @click="newFolder"
                  :disabled="folderName.length < 3"
                >
                  <NewFolder />
                </button>
                <input
                  class="p-2 w-full focus:outline-none"
                  placeholder="Create folder"
                  type="text"
                  v-model="folderName"
                  @keyup.enter="newFolder"
                />
              </div>
            </td>
          </tr>
          <tr
            class="border-b"
            v-for="f in files"
            :key="f.id"
            @click="resolveRowClick(f)"
            :class="{ 'hover:bg-gray-200 hover:cursor-pointer': f.isFolder }"
          >
            <td class="px-6 py-4" :colspan="f.isFolder ? '4' : '1'">
              <span class="flex items-center gap-2">
                <span v-if="f.isFolder"><Folder /></span><span>{{ f.name }}</span>
              </span>
            </td>
            <td class="px-6 py-4" v-if="!f.isFolder">{{ formatDateTime(f.updatedAt) }}</td>
            <td class="px-6 py-4" v-if="!f.isFolder">{{ formatFileSize(f.size) }}</td>
            <td class="px-6 py-4" v-if="!f.isFolder">
              <a
                class="inline-block text-white bg-primary hover:bg-primary-focus p-2 rounded-lg"
                :href="'http://localhost:3001/api/disk/' + disk?.hash + '/download/' + f.id"
                download
              >
                <Download />
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
