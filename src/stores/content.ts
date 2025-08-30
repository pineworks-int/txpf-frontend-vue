import { defineStore } from 'pinia'
import { ref } from 'vue'
import staticData from '@/data/static.json'

const { content } = staticData

function get(object: any, path: string) {
  return path.split('.').reduce((acc, part) => acc && acc[part], object)
}

export const useContentStore = defineStore('content', () => {
  // ~-- STATES ---
  const currentLanguage = ref<'en' | 'fr'>('en')

  // ~-- GETTERS ---
  const getContentText = (path: string) => {
    const contentBlock = get(content, path)

    if (!contentBlock) {
      console.error(`Content block not found: ${path}`)
      return { en: {}, fr: {} }
    }

    return contentBlock
  }

  // ~-- SETTERS ---
  const setLanguage = (language: 'en' | 'fr') => {
    currentLanguage.value = language
  }

  return {
    // STATES
    currentLanguage,
    // GETTERS
    getContentText,
    // SETTERS
    setLanguage,
  }
})
