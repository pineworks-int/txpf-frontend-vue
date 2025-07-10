<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import useAuth from './composables/useAuth'

const { listenForAuthState } = useAuth()

onMounted(() => {
  listenForAuthState()
})
</script>

<template>
  <RouterView />
</template>

<style scoped>

</style>
