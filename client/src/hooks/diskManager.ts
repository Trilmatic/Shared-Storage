import { api } from '@/api'
import router from '@/router'
import { ref } from 'vue'

interface Disk {
  name: string
  hash: string
}

const disk = ref<Disk | null>(null)
const loading = ref(false)

export function useDiskManager() {
  function setDisk(d: Disk) {
    disk.value = d
  }

  async function createDisk(name: string) {
    loading.value = true
    try {
      const response = await api().post('/api/disk/', {
        name: name
      })
      disk.value = response.data.disk as Disk
      openDisk(disk.value)
    } catch (error) {
      console.error(error)
    } finally {
      loading.value = false
    }
  }

  function openDisk(d: Disk) {
    disk.value = d
    router.push({ path: '/disk/' + disk.value.hash })
  }

  return {
    setDisk,
    disk,
    createDisk,
    openDisk
  }
}
