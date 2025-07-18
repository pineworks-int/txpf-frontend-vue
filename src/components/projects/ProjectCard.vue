<script setup lang="ts">
import type { ProjectProps } from '@/types/project.type'
import { useUiStore } from '@/stores/ui'

const props = defineProps<ProjectProps>()

const uiStore = useUiStore()
const { setOpenProjectDetailModal } = uiStore

function handleCardClick() {
  setOpenProjectDetailModal(props)
}
</script>

<template>
  <div
    class="border rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow"
    @click="handleCardClick"
  >
    <h3 class="text-lg font-bold">
      {{ props.title }}
    </h3>
    <img :src="props.imageUrl" :alt="props.title" class="my-2">
    <p>{{ props.description }}</p>
    <div>
      Tech stack:
      <ul>
        <li
          v-for="tech in props.technologies"
          :key="tech"
          class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
        >
          {{ tech }}
          <!-- TODO: Add tech logos later -->
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>

</style>
