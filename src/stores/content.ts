import type { Content } from '@/types/content.type'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import staticData from '@/data/static.json'

const { content } = staticData

export const useContentStore = defineStore('content', () => {
  // ~-- STATES ---
  const currentLanguage = ref<'en' | 'fr'>('en')

  // ~-- GETTERS ---
  const getContent = computed((): Content => {
    return content[currentLanguage.value]
  })

  // ~-- SETTERS ---
  const setLanguage = (language: 'en' | 'fr') => {
    currentLanguage.value = language
  }

  return {
    // STATES
    currentLanguage,
    // GETTERS
    getContent,
    // SETTERS
    setLanguage,
  }
})
