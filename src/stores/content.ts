import type { ContentBranch } from '@/types/content.type'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import staticData from '@/data/static.json'

export const useContentStore = defineStore('content', () => {
  // ~--- STATE ---
  const currentLanguage = ref<'en' | 'fr'>('en')

  // ~--- ACTIONS ---
  function setLanguage(language: 'en' | 'fr') {
    currentLanguage.value = language
  }

  // ~--- GETTERS ---
  const content = computed((): ContentBranch => {
    return staticData[currentLanguage.value]
  })

  return {
    currentLanguage,
    content,
    setLanguage,
  }
})
