<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useToastStore } from '@/stores/toast'
import { useUiStore } from '@/stores/ui'

const route = useRoute()
const ui = useUiStore()
const toast = useToastStore()

onMounted(() => {
  ui.setOpenAuthModal()
  if (route.query.reason === 'auth-required') {
    toast.showWarning('Please log in to access project demos')
  }
})
</script>

<template>
  <section class="min-h-[60vh] flex items-center justify-center">
    <div class="text-center space-y-2">
      <h1 class="text-2xl font-semibold">
        Login
      </h1>
      <p class="text-gray-500">
        Please sign in to continue.
      </p>
    </div>
  </section>
</template>
