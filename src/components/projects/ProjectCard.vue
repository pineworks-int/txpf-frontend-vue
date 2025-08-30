<script setup lang="ts">
import type { ProjectProps } from '@/types/project.type'
import Icon from '@/components/ui/Icon.vue'
import { icons } from '@/lib/icons'
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
    class="cyber-card-wrapper relative p-0.5 rounded-lg cursor-pointer transition-all duration-300"
    @click="handleCardClick"
  >
    <div class="bg-surface-1 rounded-md p-4 h-full relative z-10">
      <h3 class="text-lg font-bold">
        {{ props.title }}
      </h3>
      <img :src="props.imageUrl" :alt="props.title" class="my-2">
      <p>{{ props.description }}</p>
      <div class="mt-4">
        <ul>
          <li
            v-for="tech in props.technologies"
            :key="tech"
            class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold
                  text-gray-700 mr-2 mb-2"
          >
            <!-- Tech Icon -->
            <Icon
              v-if="icons[tech]"
              :name="tech"
              size="xs"
            />
            <!-- Tech Name -->
            <span class="ml-1">{{ tech }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cyber-card-wrapper {
  /* Base gradient */
  background: linear-gradient(to bottom right, var(--color-primary-subtle), var(--color-primary-medium));
  box-shadow: 0 0 20px rgb(0, 255, 0, 0.2);
}

.cyber-card-wrapper::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(to top left, var(--color-primary-subtle), var(--color-primary-medium));
  opacity: 0;
  transition: opacity 300ms ease-in-out;
  z-index: 1; /* Behind content */
}

.cyber-card-wrapper:hover::before {
  opacity: 1;
}

.cyber-card-wrapper > div {
  position: relative;
  z-index: 10;
}

.cyber-card-wrapper:hover {
  box-shadow:
    0 0 30px rgb(0, 255, 0, 0.4),
    0 0 60px rgb(0, 255, 0, 0.2);
}

@media (prefers-reduced-motion: reduce) {
  .cyber-card-wrapper::before {
    transition: none;
  }
}
</style>
