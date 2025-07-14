<script setup lang="ts">
import { computed } from 'vue'
import { useContent } from '@/composables/useContent'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const { content } = useContent()

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
  else if (authStore.user.id === import.meta.env.VITE_MAIN_USER_ID) {
    return 'mainUser'
  }
  else {
    return 'guestUser'
  }
})

const greetingMessage = computed(() => {
  return content.value.hero.greetings[timeOfDay.value][userType.value].message
})
</script>

<template>
  <section class="hero-section">
    <div class="main-content">
      <h1>{{ content.hero.title }}</h1>
      <p>{{ content.hero.subtitle }}</p>
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
