import { computed, ref } from 'vue'
import staticData from '@/data/static.json'

const currentLanguage = ref<('en' | 'fr')>('en')

const content = computed(() => staticData[currentLanguage.value])

function setLanguage(language: 'en' | 'fr') {
  currentLanguage.value = language
}

export function useContent() {
  return {
    currentLanguage,
    content,
    setLanguage,
  }
}
