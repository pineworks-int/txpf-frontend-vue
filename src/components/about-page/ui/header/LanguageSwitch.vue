<script setup lang="ts">
import Icon from '@/components/ui/Icon.vue'
import { useContentStore } from '@/stores/content'

const contentStore = useContentStore()

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
    bg-blue-500 hover:bg-blue-600
    text-white
    transition-colors
    "
    aria-label="Toggle language"
    @click="toggleLanguage"
  >
    <transition name="fade" mode="out-in">
      <Icon
        v-if="contentStore.currentLanguage === 'en'"
        key="en"
        name="en_flag_s"
        custom-class="w-6 h-6 lg:w-8 lg:h-8"
      />
      <Icon
        v-else
        key="fr"
        name="fr_flag_s"
        custom-class="w-6 h-6 lg:w-8 lg:h-8"
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
