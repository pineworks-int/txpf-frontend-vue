<script setup lang="ts">
import { computed } from 'vue'
import { getTechLogo } from '@/lib/tech-logos'

const props = defineProps<{
  iconKey: string
  text: string
}>()

const icon = computed(() => getTechLogo(props.iconKey))
</script>

<template>
  <div class="flex items-center space-x-3">
    <span class="text-lg text-gray-500" v-html="icon" />
    <span class="text-md text-gray-700">{{ text }}</span>
  </div>
</template>
