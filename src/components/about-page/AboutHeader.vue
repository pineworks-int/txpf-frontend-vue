<script setup lang="ts">
import { computed } from 'vue'
import LanguageSwitch from '@/components/about-page/ui/header/LanguageSwitch.vue'
import { getIcon } from '@/lib/icons'
import { useContentStore } from '@/stores/content'

const contentStore = useContentStore()

const header = computed(() => {
  return contentStore.getContentText('about-me.header')[contentStore.currentLanguage]
})
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
        <h1 class="font-bold text-5xl">
          {{ header.name }}
        </h1>
        <h2 class="text-5xl text-gray-600">
          {{ header.surname }}
        </h2>
        <p class="text-xl text-gray-600">
          {{ header.age }}
        </p>
      </div>
      <!-- Tablet: Name/Surname stacked, Age right next to them -->
      <div class="hidden md:flex lg:hidden flex-row items-center">
        <div class="flex flex-col">
          <h1 class="font-bold text-3xl">
            {{ header.name }}
          </h1>
          <h2 class="text-3xl text-gray-600">
            {{ header.surname }}
          </h2>
        </div>
      </div>
      <!-- Mobile: All in a row, centered -->
      <div class="flex flex-row items-center justify-center w-full md:hidden">
        <h1 class="font-bold text-2xl">
          {{ header.name }}
        </h1>
        <h2 class="text-2xl text-gray-600 ml-2">
          {{ header.surname }}
        </h2>
      </div>
    </div>

    <!-- Right: Buttons -->
    <div class="flex flex-col items-center justify-center h-full w-12 md:w-32">
      <div class="flex flex-row items-center justify-center md:space-x-2 lg:flex-col lg:space-y-4 lg:space-x-0">
        <LanguageSwitch />
        <button class="hidden md:block bg-blue-500 text-white px-4 py-1 rounded-md text-sm md:text-2xl lg:text-3xl">
          <svg width="1em" height="1em" viewBox="0 0 24 24"><mask id="lineMdFileDownloadFilled0"><g fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path fill="#fff" fill-opacity="0" stroke-dasharray="64" stroke-dashoffset="64" d="M13.5 3l5.5 5.5v11.5c0 0.55 -0.45 1 -1 1h-12c-0.55 0 -1 -0.45 -1 -1v-16c0 -0.55 0.45 -1 1 -1Z"><animate fill="freeze" attributeName="fill-opacity" begin="0.6s" dur="0.5s" values="0;1" /><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="64;0" /></path><path fill="#000" stroke="#000" d="M14.5 3.5l0 4.5l4.5 0z" opacity="0"><set fill="freeze" attributeName="opacity" begin="0.6s" to="1" /></path><path d="M13.5 3l5.5 5.5" opacity="0"><set fill="freeze" attributeName="opacity" begin="0.6s" to="1" /></path><path fill="#000" stroke="none" d="M12 12l4 0h-2.5v0h-3v0h-2.5z"><animate fill="freeze" attributeName="d" begin="1.1s" dur="0.2s" values="M12 12l4 0h-2.5v0h-3v0h-2.5z;M12 19l4 -4h-2.5v-3h-3v3h-2.5Z" /></path></g></mask><rect width="24" height="24" fill="currentColor" mask="url(#lineMdFileDownloadFilled0)" /></svg>
        </button>
      </div>
    </div>

    <!-- Far Right: Icons in a row, text below, all centered -->
    <div class="flex flex-col items-center justify-center h-full w-18 md:w-32 lg:w-48">
      <div class="flex flex-row justify-center space-x-1 md:space-x-2">
        <span
          class="text-2xl md:text-4xl lg:text-6xl"
          v-html="getIcon('typescript_logo')"
        />
        <span
          class="text-2xl md:text-4xl lg:text-6xl"
          v-html="getIcon('javascript_logo')"
        />
      </div>
      <p class="text-xs md:text-xl lg:text-2xl text-gray-500 text-center">
        {{ header.job }}
      </p>
    </div>
  </div>
</template>

<style lang="css" scoped>

</style>
