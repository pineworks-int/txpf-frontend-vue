<script setup lang="ts">
</script>

<template>
  <footer class="bg-surface-2 text-content">
    <div
      class="max-w-7xl mx-auto px-4 py-8
            flex flex-col md:flex-row items-center justify-between gap-4"
    >
      <div class="flex items-center gap-3">
        <button class="btn btn-secondary focus-ring text-xs" aria-label="Toggle color mode">
          Mode Toggle
        </button>
        <button class="btn btn-secondary focus-ring text-xs" aria-label="Switch language">
          EN/FR
        </button>
      </div>

      <div class="text-center md:text-right">
        <p class="text-content/70">
          T∋hx @ PineWorks Int. - &copy; {{ new Date().getFullYear() }} All Rights Reserved.
        </p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
</style>
