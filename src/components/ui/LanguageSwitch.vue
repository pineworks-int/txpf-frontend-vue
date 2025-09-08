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
    rounded-full
    border-2 border-primary-medium
    transition-colors
    "
    aria-label="Toggle language"
    @click="toggleLanguage"
  >
    <transition name="fade" mode="out-in">
      <Icon
        v-if="contentStore.currentLanguage === 'en'"
        key="en"
        name="en_flag_c"
        custom-class="w-6 h-6"
      />
      <Icon
        v-else
        key="fr"
        name="fr_flag_c"
        custom-class="w-6 h-6"
      />
    </transition>
    <span class="mx-1 text-sm text-primary-medium">
      {{ contentStore.currentLanguage === 'en' ? 'ENG' : 'FRA' }}
    </span>
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
