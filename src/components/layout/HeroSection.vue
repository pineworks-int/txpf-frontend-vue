<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useContentStore } from '@/stores/content'
import { useUiStore } from '@/stores/ui'

const ui = useUiStore()
const authStore = useAuthStore()
const contentStore = useContentStore()
const { getContent } = storeToRefs(contentStore)

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

const authStatus = computed(() => ({
  text: authStore.isUserLoggedIn ? 'AUTHENTICATED' : 'UNAUTHENTICATED',
  className: authStore.isUserLoggedIn ? 'text-cyan-400' : 'text-error',
}))

const greetingMessage = computed(() => {
  if (authStore.isUserLoading) {
    return 'Loading...'
  }

  return getContent.value.hero.greetings[timeOfDay.value][userType.value].message
})
</script>

<template>
  <section class="bg-background text-content">
    <!-- ~ Mobile ~ -->
    <div class="md:hidden belt">
      <div class="grid grid-cols-2 items-start gap-2">
        <!-- => Left: Title / Subtitle -->
        <div class="p-4">
          <h1 class="text-2xl font-semibold leading-tight tracking-tight text-content">
            {{ getContent.hero.title }}
          </h1>
          <p class="mt-1 text-sm sm:text-md text-primary-medium italic">
            {{ getContent.hero.subtitle }}
          </p>
        </div>

        <!-- => Right: Greeting -->
        <aside class="text-right">
          <p class="text-[0.6rem] text-orange-500">
            > NEURALINK_TERMINAL v6.4 | STATUS:
            <span class="text-cyan-400">ONLINE</span> | USER:
            <span :class="authStatus.className">{{ authStatus.text }}</span>
          </p>
          <p
            class="inline-flex items-center justify-end w-full whitespace-nowrap text-md sm:text-xl
                  font-bold tracking-tight text-primary"
          >
            <span class="glow-primary-sm">{{ greetingMessage }}</span>
          </p>
        </aside>
      </div>
    </div>

    <div class="md:hidden relative w-full aspect-video">
      <div class="panel-3d">
        <span>3D animation placeholder</span>
      </div>
    </div>

    <!-- ~ Desktop ~ -->
    <div class="hidden md:block">
      <!-- => Overlay mode -->
      <div v-if="ui.heroOverlayPreferred" class="relative">
        <div class="relative w-full aspect-video">
          <div class="panel-3d">
            <span>3D animation placeholder</span>
          </div>

          <!-- Belt overlay -->
          <div class="pointer-events-none absolute inset-x-0 top-0 z-10">
            <div class="pointer-events-auto w-full">
              <div class="grid grid-cols-1 md:grid-cols-2 items-start gap-4">
                <!-- Left: Title / Subtitle -->
                <div class="py-4 px-2">
                  <h1 class="text-3xl lg:text-4xl font-semibold leading-tight tracking-tight text-content">
                    {{ getContent.hero.title }}
                  </h1>
                  <p class="mt-1 text-lg text-primary-medium italic">
                    {{ getContent.hero.subtitle }}
                  </p>
                </div>

                <!-- Right: Greeting -->
                <aside class="text-right pr-4">
                  <p class="text-[0.6rem] text-orange-500">
                    > NEURALINK_TERMINAL v6.4 | STATUS:
                    <span class="text-cyan-400">ONLINE</span> | USER:
                    <span :class="authStatus.className">{{ authStatus.text }}</span>
                  </p>
                  <p
                    class="inline-flex items-center justify-end w-full whitespace-nowrap md:text-2xl
                          lg:text-3xl font-extrabold tracking-tight text-primary"
                  >
                    <span class="glow-primary-md">
                      {{ greetingMessage }}
                    </span>
                  </p>
                </aside>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- => Separate mode -->
      <div v-else>
        <!-- Belt -->
        <div class="belt">
          <div class="grid grid-cols-1 md:grid-cols-2 items-start gap-2">
            <!-- Left: Title / Subtitle -->
            <div class="py-4">
              <h1 class="text-3xl lg:text-4xl font-semibold leading-tight tracking-tight text-content">
                {{ getContent.hero.title }}
              </h1>
              <p class="mt-1 text-lg text-primary-medium italic">
                {{ getContent.hero.subtitle }}
              </p>
            </div>

            <!-- Right: Greeting -->
            <aside class="text-right">
              <p class="text-[0.6rem] text-orange-500">
                > NEURALINK_TERMINAL v6.4 | STATUS:
                <span class="text-cyan-400">ONLINE</span> | USER:
                <span :class="authStatus.className">{{ authStatus.text }}</span>
              </p>
              <p
                class="inline-flex items-center justify-end w-full whitespace-nowrap md:text-2xl lg:text-3xl
                sm:text-4xl font-extrabold tracking-tight text-primary"
              >
                <span class="glow-primary-md">
                  {{ greetingMessage }}
                </span>
              </p>
            </aside>
          </div>
        </div>

        <div class="relative w-full aspect-video">
          <div class="panel-3d">
            <span>3D animation placeholder</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
</style>
