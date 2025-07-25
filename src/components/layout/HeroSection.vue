<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useContentStore } from '@/stores/content'

const authStore = useAuthStore()
const contentStore = useContentStore()

const currentLanguage = contentStore.currentLanguage

const heroContent = computed(() => {
  return contentStore.getContentText('home.hero')[currentLanguage]
})

const timeOfDay = computed(() => {
  const hours = new Date().getHours()
  if (hours < 12)
    return 'morning'
  if (hours < 18)
    return 'afternoon'
  return 'evening'
})

const userType = computed(() => {
  if (!authStore.user) {
    return 'unknownUser'
  }
  else if (authStore.user.id === import.meta.env.VITE_SUPABASE_MAINUSER_ID) {
    return 'mainUser'
  }
  else {
    return 'guestUser'
  }
})

const greetingMessage = computed(() => {
  if (authStore.isUserLoading) {
    return 'Loading...'
  }

  return heroContent.value.greetings[timeOfDay.value][userType.value].message
})
</script>

<template>
  <section class="hero-section">
    <div class="main-content">
      <h1>{{ heroContent.title }}</h1>
      <p>{{ heroContent.subtitle }}</p>
    </div>
    <aside class="greeting-content">
      <!-- maybe RSS feed later -->
      <p>{{ greetingMessage }}</p>
    </aside>
  </section>
</template>

<style scoped>
.hero-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 80vh;
  padding: 2rem;
  background-color: #e9e9e9; /* temporary */
}
</style>
