export function formatDateTime(date: string): string | null {
  try {
    return new Date(date).toLocaleDateString('cs-CZ', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  } catch (error) {
    return null
  }
}

export function formatFileSize(fileSize: number | null): string {
  if (!fileSize) return '0'
  const sizeInKb = fileSize / 1024

  if (sizeInKb > 1024) {
    return `${(sizeInKb / 1024).toFixed(2)} MB`
  } else {
    return `${sizeInKb.toFixed(0)} kB`
  }
}
