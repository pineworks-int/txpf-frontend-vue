<script setup lang="ts">
import { techLogos } from '@/lib/tech-logos'
</script>

<template>
  <div class="w-full h-full flex flex-row items-start">
    <!-- Left: Photo -->
    <div class="flex justify-center items-center h-full w-16 md:w-24 lg:w-48 xl:w-64">
      <img
        src="https://via.placeholder.com/96"
        alt="Profile"
        class="rounded-full object-cover w-14 h-14 border md:w-20 md:h-20 md:border-2 lg:w-35 lg:h-35 lg:border-4 border-white shadow"
      >
    </div>

    <!-- Center: Name/Surname/Age -->
    <div class="flex-1 flex flex-col justify-center h-full lg:ml-2">
      <!-- Large screens: vertical stack, centered vertically -->
      <div class="hidden lg:flex flex-col items-start">
        <h1 class="font-bold text-5xl">Thibault</h1>
        <h2 class="text-5xl text-gray-600">Dubois</h2>
        <p class="text-xl text-gray-600">35 ans</p>
      </div>
      <!-- Tablet: Name/Surname stacked, Age right next to them -->
      <div class="hidden md:flex lg:hidden flex-row items-center">
        <div class="flex flex-col">
          <h1 class="font-bold text-3xl">Thibault</h1>
          <h2 class="text-3xl text-gray-600">Dubois</h2>
        </div>
      </div>
      <!-- Mobile: All in a row, centered -->
      <div class="flex flex-row items-center justify-center w-full md:hidden">
        <h1 class="font-bold text-2xl">Thibault</h1>
        <h2 class="text-2xl text-gray-600 ml-2">Dubois</h2>
      </div>
    </div>

    <!-- Right: Icons in a row, text below, all centered -->
    <div class="flex flex-col items-center justify-center h-full w-18 md:w-32 lg:w-48 xl:w-64">
      <div class="flex flex-row justify-center space-x-1 md:space-x-2">
        <span
          class="text-2xl md:text-4xl lg:text-6xl"
          v-html="techLogos.typescript_logo"
        />
        <span
          class="text-2xl md:text-4xl lg:text-6xl"
          v-html="techLogos.javascript_logo"
        />
      </div>
      <p class="text-xs md:text-xl lg:text-2xl text-gray-500 text-center">
        Developper
      </p>
    </div>
  </div>
</template>

<style lang="css" scoped>

</style>
