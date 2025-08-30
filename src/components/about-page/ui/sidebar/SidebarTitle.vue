<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<template>
  <h3 class="text-lg font-semibold text-gray-800 mb-2 border-b border-gray-200">
    {{ title }}
  </h3>
</template>
