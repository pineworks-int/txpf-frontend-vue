<script setup lang="ts">
import { useContentStore } from '@/stores/content'

const contentStore = useContentStore()

function toggleLanguage() {
  const newLang = contentStore.currentLanguage === 'en' ? 'fr' : 'en'
  contentStore.setLanguage(newLang)
}
</script>

<template>
  <button
    class="p-2 rounded-md hover:bg-gray-200 transition-colors"
    @click="toggleLanguage"
  >
    <span v-if="contentStore.currentLanguage === 'en'" class="font-semibold">EN</span>
    <span v-else class="font-semibold">FR</span>
  </button>
</template>

<style scoped>

</style>
