<script setup lang="ts">
import Icon from '@/components/ui/Icon.vue'
</script>

<template>
  <button
    class="
      flex
      items-center justify-center
      rounded-md
      px-2 py-1 md:px-3 md:py-1 lg:px-4 lg:py-2
      bg-blue-500 hover:bg-blue-600
      text-white
      transition-colors
    "
    aria-label="Download Resume"
  >
    <Icon name="a_dl" custom-class="w-6 h-6 lg:w-8 lg:h-8" />
  </button>
</template>

<style scoped>

</style>
