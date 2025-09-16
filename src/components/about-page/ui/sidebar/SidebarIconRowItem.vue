<script setup lang="ts">
import Icon from '@/components/ui/Icon.vue'

defineProps<{
  iconKey: string
  text: string
}>()
</script>

<template>
  <div
    class="relative flex justify-center items-center p-2 border-1 border-neutral-400 rounded-md group"
  >
    <span
      class="text-xl filter grayscale group-hover:grayscale-0 transition duration-300 ease-in-out"
    >
      <Icon :name="iconKey" size="lg" />
    </span>
    <div
      class="
        absolute
        bottom-full
        mb-2
        px-2
        py-1
        text-xs
        text-white
        bg-gray-800
        rounded-md
        opacity-0
        group-hover:opacity-100
        transition-opacity
        pointer-events-none
        whitespace-nowrap
      "
    >
      {{ text }}
    </div>
  </div>
</template>
