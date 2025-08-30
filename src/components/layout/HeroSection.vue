<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed, watch } from 'vue'
import useAuth from '@/composables/useAuth'
import { useGreetingAnimation } from '@/composables/useGreetingAnimation'
import { useAuthStore } from '@/stores/auth'
import { useContentStore } from '@/stores/content'

const authStore = useAuthStore()
const contentStore = useContentStore()
const { getContent } = storeToRefs(contentStore)

const { userType, userDisplayName } = useAuth()

const dynamicTitle = computed(() => {
  const baseTitle = getContent.value.hero.title
  return baseTitle.replace('[$USER]', userDisplayName.value)
})

const authStatus = computed(() => ({
  text: authStore.isUserLoggedIn ? 'AUTHENTICATED' : 'UNAUTHENTICATED',
  className: authStore.isUserLoggedIn ? 'text-primary-medium' : 'text-error',
}))

const { line1, line2, line3, restartWithNewData } = useGreetingAnimation(
  authStore.isUserLoggedIn,
  userType.value,
)

// Watch for changes and restart animation with new data
watch([() => authStore.isUserLoggedIn, userType], ([newIsLoggedIn, newUserType]) => {
  restartWithNewData(newIsLoggedIn, newUserType)
})
</script>

<template>
  <section class="bg-background text-content">
    <!-- ~ Mobile Terminal Header ~ -->
    <div class="md:hidden bg-surface-1 flex justify-center py-1">
      <p class="text-xs text-amber-600 font-rajdhani">
        > NEURALINK_TERMINAL v6.4 | USER:
        <span :class="authStatus.className">{{ authStatus.text }}</span>
      </p>
    </div>

    <!-- ~ Desktop Terminal Header ~ -->
    <div class="hidden md:block bg-surface-1 py-1 px-6">
      <div class="grid" style="grid-template-columns: 1fr minmax(auto, 305px);">
        <!-- Empty -->
        <div />
        <div class="text-left">
          <p class="text-xs text-amber-600 font-rajdhani">
            > NEURALINK_TERMINAL v6.4 | USER:
            <span :class="authStatus.className">{{ authStatus.text }}</span>
          </p>
        </div>
      </div>
    </div>

    <!-- ~ Mobile ~ -->
    <div class="md:hidden belt">
      <div
        class="grid items-center gap-10" style="grid-template-columns: 1fr minmax(auto, 180px);"
      >
        <!-- => Left: Title / Subtitle -->
        <div class="pt-2">
          <h1 class="text-md sm:text-xl sm:font-oxanium leading-tight tracking-tight text-content font-rajdhani">
            {{ dynamicTitle }}
          </h1>
          <p class="mt-1 text-xs text-primary-medium italic font-montserrat whitespace-pre-line">
            {{ getContent.hero.subtitle }}
          </p>
        </div>

        <!-- => Right: Greeting -->
        <aside class="h-18">
          <div>
            <div class="text-left pt-2">
              <p class="text-xs font-rajdhani text-content">
                <span class="glow-primary-md" v-html="line1" />
              </p>
              <p class="text-xs font-rajdhani text-content">
                <span class="glow-primary-md" v-html="line2" />
              </p>
              <p class="pt-2 text-xs font-rajdhani text-content">
                <span class="glow-primary-md" v-html="line3" />
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
    <!-- Mobile: 3D Animation Placeholder -->
    <div class="md:hidden relative w-full aspect-video">
      <div class="panel-3d">
        <span>3D animation placeholder</span>
      </div>
    </div>

    <!-- ~ Desktop ~ -->
    <div class="hidden md:block">
      <div class="belt">
        <div class="grid items-center gap-2" style="grid-template-columns: 1fr minmax(auto, 310px);">
          <!-- => Left: Title / Subtitle -->
          <div class="">
            <h1 class="text-xl lg:text-2xl font-semibold leading-tight tracking-tight text-content font-oxanium">
              {{ dynamicTitle }}
            </h1>
            <p class="mt-1 text-md text-primary-medium italic font-montserrat font-extralight whitespace-pre-line">
              {{ getContent.hero.subtitle }}
            </p>
          </div>

          <!-- => Right: Greeting -->
          <aside class="h-20">
            <div>
              <div class="flex flex-col items-end">
                <div class="text-left w-full">
                  <p class="text-md font-oxanium text-content/80">
                    <span v-html="line1" />
                  </p>
                  <p class="text-md font-oxanium text-content/80">
                    <span v-html="line2" />
                  </p>
                  <p class="pt-2 text-md font-oxanium text-content/80">
                    <span v-html="line3" />
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
      <!-- Desktop: 3D Animation Placeholder -->
      <div class="relative w-full aspect-video">
        <div class="panel-3d">
          <span>3D animation placeholder</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
</style>
