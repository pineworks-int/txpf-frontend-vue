<script setup lang="ts">
import { ref } from 'vue'
import useAuth from '../../composables/useAuth'
import { useUiStore } from '../../stores/ui'

const uiStore = useUiStore()
const { logIn } = useAuth()
const userEmail = ref('')
const userPassword = ref('')

async function handleSubmit() {
  try {
    await logIn(userEmail.value, userPassword.value)
    console.warn('[AuthModal] Login Success !')
    uiStore.setCloseAuthModal()
  }
  catch (error) {
    console.error('[AuthModal] Login Failure : ', error)
  }
}
</script>

<template>
  <div
    v-if="uiStore.isAuthModalOpen"
    class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
  >
    <div class="bg-white p-8 rounded-lg w-full max-w-sm">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-bold">
          Log In
        </h2>
        <button
          class="text-gray-500 hover:text-gray-800"
          @click="uiStore.setCloseAuthModal()"
        >
          <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>

      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            v-model="userEmail"
            type="email"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            v-model="userPassword"
            type="password"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
        </div>
        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          Request Access
        </button>
      </form>
    </div>
  </div>
</template>
