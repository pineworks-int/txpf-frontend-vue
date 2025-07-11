<script setup lang="ts">
import { useUiStore } from '../../stores/ui'

const uiStore = useUiStore()
</script>

<template>
  <div v-if="uiStore.isAuthModalOpen" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    <div class="bg-white p-8 rounded-lg">
      <h2 class="text-xl font-bold mb-4">
        Sign In
      </h2>

      <!-- email/password form go here -->
      <p class="mb-4">
        Authentication Form
      </p>

      <button class="text-red-500" @click="uiStore.closeAuthModal()">
        Close
      </button>
    </div>
  </div>
</template>
