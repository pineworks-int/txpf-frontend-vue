<script setup lang="ts">
import { computed } from 'vue'
import { getIcon } from '@/lib/icons'

type FooterPopoverContent = 'hardskills' | 'softskills' | 'other'

const emit = defineEmits<{
  (e: 'openPopover', contentKey: FooterPopoverContent, event: MouseEvent): void
}>()

const footerItems = computed(() => [
  {
    iconKey: 'coding',
    label: 'Hard Skills',
    modalContent: 'hardskills',
  },
  {
    iconKey: 'talk',
    label: 'Soft Skills',
    modalContent: 'softskills',
  },
  {
    iconKey: 'shiny',
    label: 'Others',
    modalContent: 'other',
  },
])

function openPopover(modalContent: string, event: MouseEvent) {
  emit('openPopover', modalContent as FooterPopoverContent, event)
}
</script>

<template>
  <div class="h-full w-full">
    <div
      class="
        md:flex md:items-center md:justify-center
        h-full w-full
      "
    >
      <!-- => Mobile/Tablet: Clickable areas -->
      <div class="md:hidden grid grid-cols-3 h-full w-full">
        <button
          v-for="item in footerItems"
          :key="item.iconKey"
          class="
            flex flex-col items-center justify-center
            h-full w-full
            text-xs text-gray-700
            transition-colors hover:bg-yellow-200
            border-r border-yellow-500 last:border-r-0
          "
          @click="openPopover(item.modalContent, $event)"
        >
          <span
            class="text-2xl"
            v-html="getIcon(item.iconKey)"
          />
          <span>{{ item.label }}</span>
        </button>
      </div>

      <!-- => Desktop: Centered buttons -->
      <div class="hidden md:flex items-center justify-center space-x-4">
        <button
          v-for="item in footerItems"
          :key="item.iconKey"
          class="
            flex items-center space-x-2
            px-4 py-2
            rounded-lg
            bg-yellow-200/50 text-slate-700
            shadow-lg backdrop-blur-sm
            transition-colors hover:bg-yellow-300/70
          "
          @click="openPopover(item.modalContent, $event)"
        >
          <span
            class="text-xl"
            v-html="getIcon(item.iconKey)"
          />
          <span>{{ item.label }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>

</style>
