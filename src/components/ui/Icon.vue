<script setup lang="ts">
import { computed } from 'vue'
import { getIcon } from '@/lib/icons'

interface Props {
  name: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl'
  customClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
})

const iconSvg = computed(() => {
  const svg = getIcon(props.name)
  if (!svg) {
    return ''
  }
  return svg
})

const sizeClass = computed(() => {
  if (props.customClass) {
    return props.customClass
  }

  const sizes = {
    'xs': 'w-3 h-3', // 12px
    'sm': 'w-4 h-4', // 16px
    'md': 'w-5 h-5', // 20px
    'lg': 'w-6 h-6', // 24px
    'xl': 'w-8 h-8', // 32px
    '2xl': 'w-10 h-10', // 40px
    '3xl': 'w-12 h-12', // 48px
    '4xl': 'w-14 h-14', // 56px
    '5xl': 'w-16 h-16', // 64px
  }
  return sizes[props.size]
})
</script>

<template>
  <div
    class="flex items-center justify-center"
    :class="sizeClass"
    v-html="iconSvg"
  />
</template>
