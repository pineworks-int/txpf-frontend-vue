<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import AuthModal from '@/components/auth/AuthModal.vue'
import FooterSection from '@/components/layout/FooterSection.vue'
import NavBar from '@/components/layout/NavBar.vue'
import ToastContainer from '@/components/ui/ToastContainer.vue'
import useAuth from '@/composables/useAuth'

const { listenForAuthState } = useAuth()
const route = useRoute()
const isAboutMePage = route.name === 'aboutMe'

onMounted(() => {
  listenForAuthState()
})
</script>

<template>
  <NavBar v-if="!isAboutMePage" />
  <ToastContainer />
  <main>
    <RouterView />
  </main>
  <AuthModal />
  <FooterSection v-if="!isAboutMePage" />
</template>

<style scoped>

</style>
