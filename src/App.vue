<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import AuthModal from '@/components/auth/AuthModal.vue'
import FooterSection from '@/components/layout/FooterSection.vue'
import NavBar from '@/components/layout/NavBar.vue'
import ToastContainer from '@/components/ui/ToastContainer.vue'
import useAuth from '@/composables/useAuth'

const { listenForAuthState } = useAuth()

onMounted(() => {
  listenForAuthState()
})
</script>

<template>
  <NavBar />
  <ToastContainer />
  <main>
    <RouterView />
  </main>
  <AuthModal />
  <FooterSection />
</template>

<style scoped>

</style>
