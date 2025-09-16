<script setup lang="ts">
import Icon from '@/components/ui/Icon.vue'

defineProps<{
  iconKey: string
  text: string
}>()
</script>

<template>
  <div class="flex items-center space-x-3 ml-2 group">
    <span
      v-if="iconKey === 'fr_flag_c' || iconKey === 'en_flag_c'"
      class="text-2xl"
    >
      <Icon :name="iconKey" size="lg" />
    </span>
    <span
      v-else
      class="text-2xl filter grayscale group-hover:grayscale-0 transition duration-300 ease-in-out"
    >
      <Icon :name="iconKey" size="lg" />
    </span>
    <span class="text-md text-gray-700">{{ text }}</span>
  </div>
</template>
