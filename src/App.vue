<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import FooterSection from './components/layout/FooterSection.vue'
import NavBar from './components/layout/NavBar.vue'
import useAuth from './composables/useAuth'

const { listenForAuthState } = useAuth()

onMounted(() => {
  listenForAuthState()
})
</script>

<template>
  <NavBar />
  <main>
    <RouterView />
  </main>
  <FooterSection />
</template>

<style scoped>

</style>
