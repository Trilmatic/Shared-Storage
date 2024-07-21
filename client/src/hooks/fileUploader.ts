import { api } from '@/api'
import { computed, ref } from 'vue'
import { useDiskManager } from './diskManager'

export interface File {
    id: number
    name: string
    updatedAt: string
    size: string | null
    path: string | null
    type: string | null
    parentId: number | null
    destination: number | null
    isFolder: boolean
}

const { disk, setDisk } = useDiskManager()

const files = ref<File[]>([])
const count = ref<number | null>(null)
const listLoading = ref(false)
const uploadLoading = ref(false)
const path = ref<File[]>([])
const parent = computed<number | null>(() => {
    if (path.value.length === 0) return null
    return path.value[path.value.length - 1].id;
})


export function useFileUploader() {
    function openFolder(folder: File) {
        path.value.push(folder);
        refresh();
    }

    function moveUpFolder() {
        if (path.value.length === 0) return
        path.value.pop();
        refresh();
    }

    async function refresh(hash: string | null = null) {
        const h = hash || disk.value?.hash;
        if (!h) return
        listLoading.value = true

        try {
            const response = await api().get('/api/disk/' + h, {
                params: {
                    parent: parent.value ?? undefined
                }
            })
            files.value = response.data.files.rows
            count.value = response.data.files.count
            setDisk(response.data.disk)
        } catch (error) {
            console.error(error)
        } finally {
            listLoading.value = false
        }
    }

    async function uploadFile(f: FileList | null) {
        if (!disk.value?.hash) return
        uploadLoading.value = true
        if (!f) return
        var data = new FormData()
        for (var i = 0; i < f.length; i++) {
            data.append('fileList[]', f[i])
        }
        if (parent.value) {
            data.append('parent', String(parent.value));
        }
        try {
            await api().post('/api/disk/' + disk.value?.hash + '/files', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            refresh()
        } catch (error) {
            console.error(error)
        } finally {
            uploadLoading.value = false
        }
    }

    async function createFolder(name: string) {
        if (!disk.value?.hash) return
        uploadLoading.value = true
        try {
            await api().post('/api/disk/' + disk.value?.hash + '/folder', {
                name: name
            })
            refresh()
        } catch (error) {
            console.error(error)
        } finally {
            uploadLoading.value = false
        }
    }

    return {
        files,
        listLoading,
        uploadLoading,
        createFolder,
        refresh,
        uploadFile,
        count,
        path,
        openFolder,
        moveUpFolder,
        parent
    }
}
