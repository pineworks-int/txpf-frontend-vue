<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUiStore } from '@/stores/ui'

const ui = useUiStore()
const { isAuthVerificationLoading } = storeToRefs(ui)
</script>

<template>
  <transition name="fade">
    <div
      v-if="isAuthVerificationLoading"
      class="fixed inset-0 z-[70] flex items-center justify-center bg-black/40"
      aria-live="polite"
      aria-busy="true"
    >
      <div class="flex items-center gap-3 rounded-md bg-white px-4 py-3 shadow">
        <svg class="h-5 w-5 animate-spin text-gray-700" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" />
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
        </svg>
        <span class="text-sm text-gray-700">Verifying access…</span>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
