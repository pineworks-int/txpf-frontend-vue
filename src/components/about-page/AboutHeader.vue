<script setup lang="ts">
import { storeToRefs } from 'pinia'
import DownloadButton from '@/components/about-page/ui/header/DownloadButton.vue'
import Icon from '@/components/ui/Icon.vue'
import LanguageSwitch from '@/components/ui/LanguageSwitch.vue'
import { useContentStore } from '@/stores/content'

const emit = defineEmits<{
  (e: 'openPopover', contentKey: 'contact', event: MouseEvent): void
}>()

const contentStore = useContentStore()
const { getContent } = storeToRefs(contentStore)

const header = getContent.value['about-me'].header

function handleProfileClick(event: MouseEvent) {
  emit('openPopover', 'contact', event)
}
</script>

<template>
  <div class="w-full h-full flex flex-row items-center">
    <!-- ~ Left: Photo ~ -->
    <div class="flex justify-center items-center h-full w-18 md:w-24 lg:w-48 xl:w-64">
      <!-- => Clickable version for < 1024px -->
      <button
        class="
          lg:hidden rounded-full
          transition-all duration-300 ease-in-out
          shadow-[0_0_20px_7px_rgba(216,180,254,0.75)]
          hover:scale-110 hover:shadow-[0_0_25px_8px_rgba(192,132,252,0.8)]
          focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
        "
        @click="handleProfileClick"
      >
        <img
          src="https://via.placeholder.com/96"
          alt="Profile"
          class="rounded-full object-cover w-14 h-14 border md:w-20 md:h-20 md:border-2 lg:w-35 lg:h-35 lg:border-4 border-white"
        >
      </button>
      <!-- => Static version for >= 1024px -->
      <div class="hidden lg:block">
        <img
          src="https://via.placeholder.com/96"
          alt="Profile"
          class="rounded-full object-cover w-14 h-14 border md:w-20 md:h-20 md:border-2 lg:w-35 lg:h-35 lg:border-4 border-white shadow"
        >
      </div>
    </div>

    <!-- => Mobile-only Download Button ~ -->
    <DownloadButton class="p-1 text-2xl md:hidden" />

    <!-- ~ Center: Name/Surname/Age ~ -->
    <div class="flex-1 flex flex-col justify-center h-full lg:ml-2">
      <!-- => Large screens: vertical stack, centered vertically -->
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
      <!-- => Tablet: Name/Surname stacked -->
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
      <!-- => Mobile: All in a row, centered -->
      <div class="flex w-full flex-col items-center justify-center min-[480px]:flex-row md:hidden">
        <h1 class="font-bold text-2xl leading-tight min-[480px]:leading-normal">
          {{ header.name }}
        </h1>
        <h2 class="text-2xl text-gray-600 leading-tight min-[480px]:leading-normal min-[480px]:ml-2">
          {{ header.surname }}
        </h2>
      </div>
    </div>

    <!-- ~ Right: Buttons ~ -->
    <div class="flex flex-col items-center justify-center h-full w-12 md:w-28 lg:w-18 xl:w-24">
      <div class="flex flex-row items-center justify-center md:space-x-2 lg:flex-col lg:space-y-2 lg:space-x-0">
        <LanguageSwitch />
        <!-- => Desktop-only Download Button -->
        <DownloadButton class="hidden md:block" />
      </div>
    </div>

    <!-- ~ Far Right: Icons in a row, text below ~ -->
    <div class="flex flex-col items-center justify-center h-full w-18 md:w-32 lg:w-44">
      <div class="flex flex-row justify-center space-x-1 md:space-x-2">
        <Icon
          name="typescript"
          custom-class="w-6 h-6 md:w-12 md:h-12 lg:w-16 lg:h-16"
        />
        <Icon
          name="javascript"
          custom-class="w-6 h-6 md:w-12 md:h-12 lg:w-16 lg:h-16"
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
