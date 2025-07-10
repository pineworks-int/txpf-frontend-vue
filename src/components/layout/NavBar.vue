<script setup lang="ts">
import { ref } from 'vue'

const isMenuOpen = ref(false)
</script>

<template>
  <nav class="bg-gray-100 p-4 flex items-center justify-between">
    <!-- Logo here -->
    <div>
      <span class="text-xl font-bold">LOGO</span>
    </div>

    <!-- Desktop Menu -->
    <ul class="hidden md:flex items-center gap-4">
      <li>
        <a href="#projects" class="hover:text-blue-500">Projects</a>
      </li>
      <li>
        <router-link to="/about-me" class="hover:text-blue-500">
          About Me
        </router-link>
      </li>
    </ul>
    <div class="hidden md:flex items-center gap-4">
      <button class="bg-blue-500 text-white px-4 py-2 rounded">
        Sign In
      </button>
      <span>AVATAR</span>
    </div>

    <!-- Mobile Menu Button -->
    <div class="md:hidden">
      <button @click="isMenuOpen = !isMenuOpen">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </button>
    </div>

    <!-- Mobile Menu -->
    <div v-if="isMenuOpen" class="absolute top-16 left-0 w-full bg-gray-100 md:hidden">
      <ul class="flex flex-col items-center gap-4 p-4">
        <li>
          <a href="#projects">Projects</a>
        </li>
        <li>
          <router-link to="/about-me">
            About Me
          </router-link>
        </li>
        <li>
          <button class="bg-blue-500 text-white px-4 py-2 rounded">
            Sign In
          </button>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style scoped>
</style>
