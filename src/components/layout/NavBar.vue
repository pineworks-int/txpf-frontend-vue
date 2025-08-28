<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import UserAvatar from '@/components/layout/UserAvatar.vue'
import useAuth from '@/composables/useAuth'
import { useAuthStore } from '@/stores/auth'
import { useContentStore } from '@/stores/content'
import { useUiStore } from '@/stores/ui'

const isMenuOpen = ref(false)

const { logOut } = useAuth()
const uiStore = useUiStore()
const authStore = useAuthStore()
const contentStore = useContentStore()
const { getContent } = storeToRefs(contentStore)

const { avatarRole } = useAuth()

function handleLogout() {
  logOut()
}
</script>

<template>
  <nav
    class="bg-surface-2 border-t-1 border-primary p-4 grid grid-cols-[1fr_auto_1fr]
          items-center cyber-border"
  >
    <!-- ~ Left Cell: Logo ~ -->
    <div class="justify-self-start">
      <a href="/" class="focus-ring">
        <img src="/tree-only.svg" alt="Tree Logo" class="w-10 h-8 md:h-12 -my-2">
      </a>
    </div>

    <!-- ~ Center Cell: Desktop Navigation ~ -->
    <div class="justify-self-center">
      <ul class="hidden md:flex items-center gap-4">
        <li v-for="item in getContent.nav.uiLinks" :key="item.label">
          <a :href="item.url" class="nav-link-cyber focus-ring font-oxanium">
            {{ item.label }}
          </a>
        </li>
      </ul>
    </div>

    <!-- ~ Right Cell: Auth + Mobile Menu ~ -->
    <div class="justify-self-end flex items-center gap-3">
      <!-- => Desktop Auth -->
      <div class="hidden md:flex items-center gap-4">
        <button
          v-if="authStore.isUserLoggedIn"
          class="btn btn-cta focus-ring font-oxanium"
          @click="handleLogout"
        >
          Log Out
        </button>
        <button
          v-else
          class="btn btn-cta focus-ring"
          @click="uiStore.setOpenAuthModal"
        >
          Log In
        </button>
        <UserAvatar
          v-if="authStore.isUserLoggedIn"
          :user-role="avatarRole"
          size="md"
        />
      </div>

      <!-- => Mobile Menu Button -->
      <button
        class="md:hidden text-content hover:text-primary"
        @click="isMenuOpen = !isMenuOpen"
      >
        <svg width="24" height="24" viewBox="0 0 24 24">
          <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
            <!-- => Line 1 -->
            <path d="M5 5h14" stroke-dasharray="16" stroke-dashoffset="16">
              <animate
                attributeName="stroke-dashoffset"
                values="16;0;0"
                keyTimes="0;0.1;1"
                dur="5s"
                repeatCount="indefinite"
              />
            </path>

            <!-- => Line 2 -->
            <path d="M5 12h14" stroke-dasharray="16" stroke-dashoffset="16">
              <animate
                attributeName="stroke-dashoffset"
                begin="0.5s"
                values="16;0;0"
                keyTimes="0;0.1;1"
                dur="5s"
                repeatCount="indefinite"
              />
            </path>

            <!-- => Line 3 -->
            <path d="M5 19h14" stroke-dasharray="16" stroke-dashoffset="16">
              <animate
                attributeName="stroke-dashoffset"
                begin="1s"
                values="16;0;0"
                keyTimes="0;0.1;1"
                dur="5s"
                repeatCount="indefinite"
              />
            </path>
          </g>
        </svg>
      </button>
    </div>

    <!-- ~ Mobile Menu ~ -->
    <div v-if="isMenuOpen" class="absolute z-20 top-full left-0 w-full bg-surface-1 md:hidden">
      <ul class="flex flex-col items-center gap-4 p-4">
        <li v-for="item in getContent.nav.uiLinks" :key="item.label">
          <a :href="item.url" class="nav-link-cyber focus-ring font-exo2">
            {{ item.label }}
          </a>
        </li>
        <li>
          <button
            v-if="!authStore.isUserLoggedIn"
            class="btn btn-cta focus-ring"
            @click="uiStore.setOpenAuthModal"
          >
            Log In
          </button>
          <button
            v-else
            class="btn btn-cta focus-ring"
            @click="handleLogout"
          >
            Log Out
          </button>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style scoped>
</style>
