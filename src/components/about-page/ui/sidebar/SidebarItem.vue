<script setup lang="ts">
import { computed } from 'vue'
import { getIcon } from '@/lib/icons'

const props = defineProps<{
  iconKey: string
  text: string
}>()

const icon = computed(() => getIcon(props.iconKey))
</script>

<template>
  <div class="flex items-center space-x-3 ml-2 group">
    <span
      v-if="iconKey === 'fr_flag_c' || iconKey === 'en_flag_c'"
      class="text-2xl"
      v-html="icon"
    />
    <span
      v-else
      class="text-2xl filter grayscale group-hover:grayscale-0 transition duration-300 ease-in-out"
      v-html="icon"
    />
    <span class="text-md text-gray-700">{{ text }}</span>
  </div>
</template>
