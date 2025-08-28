<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  userRole?: 'guest' | 'admin' | null
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  userRole: null,
  size: 'md',
})

// Determine circle color based on role
const circleColor = computed(() => {
  switch (props.userRole) {
    case 'guest':
      return 'rgb(0, 255, 255)' // cyan
    case 'admin':
      return 'var(--color-secondary)' // your secondary color
    default:
      return 'var(--color-primary-subtle)' // fallback
  }
})

// Size variants
const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm': return 'w-6 h-6'
    case 'md': return 'w-8 h-8'
    case 'lg': return 'w-10 h-10'
    default: return 'w-8 h-8'
  }
})
</script>

<template>
  <div class="user-avatar" :class="[sizeClasses]">
    <svg
      viewBox="0 0 24 24"
      fill="none"
      :aria-label="`User avatar - ${userRole || 'unknown role'}`"
      role="img"
    >
      <!-- ~ Circle background ~ -->
      <circle
        cx="12"
        cy="12"
        r="11"
        :fill="circleColor"
        stroke="var(--color-content)"
        stroke-width="1"
        opacity="0.9"
      />

      <!-- ~ Icon ~ -->
      <g fill="var(--color-background)" opacity="0.8">
        <!-- => Head -->
        <circle cx="12" cy="8" r="3" />
        <!-- => Body -->
        <path d="M6 18c0-3.5 2.5-6 6-6s6 2.5 6 6" />
      </g>
    </svg>
  </div>
</template>

<style scoped>
.user-avatar {
  @apply flex items-center justify-center rounded-full;
}

.user-avatar svg {
  @apply w-full h-full;
}
</style>
