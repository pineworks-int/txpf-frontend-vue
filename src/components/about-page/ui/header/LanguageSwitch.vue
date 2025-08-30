<script setup lang="ts">
import { computed } from 'vue'
import { getIcon } from '@/lib/icons'
import { useContentStore } from '@/stores/content'

const contentStore = useContentStore()

const enFlagIcon = computed(() => getIcon('en_flag_s'))
const frFlagIcon = computed(() => getIcon('fr_flag_s'))

function toggleLanguage() {
  const newLang = contentStore.currentLanguage === 'en' ? 'fr' : 'en'
  contentStore.setLanguage(newLang)
}
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
    aria-label="Toggle language"
    @click="toggleLanguage"
  >
    <transition name="fade" mode="out-in">
      <span
        v-if="contentStore.currentLanguage === 'en'"
        key="en"
        class="block leading-none"
        v-html="enFlagIcon"
      />
      <span
        v-else
        key="fr"
        class="block leading-none"
        v-html="frFlagIcon"
      />
    </transition>
  </button>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
