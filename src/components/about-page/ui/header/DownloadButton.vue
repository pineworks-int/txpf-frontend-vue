<script setup lang="ts">
import { computed } from 'vue'
import { getIcon } from '@/lib/icons'

const uid = `mask-${Math.random().toString(36).substring(2, 9)}`

const downloadIcon = computed(() => {
  const svg = getIcon('a_dl')
  if (!svg)
    return null

  // ? Replace the static mask ID of the SVG with a unique one
  // ? --> avoid id duplication in the parent element
  return svg
    .replace(/id="([^"]+)"/g, `id="${uid}"`)
    .replace(/url\(#([^"]+)\)/g, `url(#${uid})`)
})
</script>

<template>
  <button
    class="
      flex
      items-center justify-center
      rounded-md
      px-2 py-1 md:px-3 md:py-1 lg:px-4 lg:py-2
      text-2xl lg:text-3xl
      bg-blue-500 hover:bg-blue-600
      text-white
      transition-colors
    "
    aria-label="Download Resume"
  >
    <span
      v-if="downloadIcon"
      class="block leading-none"
      v-html="downloadIcon"
    />
  </button>
</template>

<style scoped>

</style>
