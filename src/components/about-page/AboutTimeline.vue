<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'

const props = defineProps<{
  dotPercentage: number
  sectionMarkers: { id: string, name: string, startPercent: number, endPercent: number }[]
}>()

const timelineBarRef = ref<HTMLElement | null>(null)
const barHeightInPixels = ref(0)
const currentTop = ref(0)
const targetTop = ref(0)
let animationFrameId: number | null = null

const dotStyle = computed(() => {
  return {
    top: `${currentTop.value}px`,
    transform: 'translateY(-50%)',
  }
})

function animate() {
  const distance = targetTop.value - currentTop.value

  if (Math.abs(distance) < 0.5) {
    currentTop.value = targetTop.value
    animationFrameId = null
  }
  else {
    currentTop.value += distance * 0.1
    animationFrameId = requestAnimationFrame(animate)
  }
}

watch(() => props.dotPercentage, (newPercentage) => {
  // //console.log(`TIMELINE received new percentage: ${Math.round(newPercentage * 100)}%`)
  targetTop.value = barHeightInPixels.value * newPercentage

  if (!animationFrameId) {
    animationFrameId = requestAnimationFrame(animate)
  }
})

function updateBarHeight() {
  if (timelineBarRef.value) {
    barHeightInPixels.value = timelineBarRef.value.offsetHeight
    if (currentTop.value === 0) {
      targetTop.value = barHeightInPixels.value * props.dotPercentage
      currentTop.value = targetTop.value
    }
  }
}

// ~ Lifecycle Hooks ~
onMounted(() => {
  nextTick(updateBarHeight)
  window.addEventListener('resize', updateBarHeight)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateBarHeight)
})
</script>

<template>
  <div class="relative flex h-full w-full justify-center pt-8 pb-8">
    <div ref="timelineBarRef" class="relative h-full w-0.5 bg-gray-300">
      <!-- => Dot -->
      <div
        class="absolute left-1/2 -translate-x-1/2 h-4 w-4 rounded-full border-2 border-white bg-purple-600 shadow-lg"
        :style="dotStyle"
      />
      <!-- => Section Markers -->
      <div
        v-for="marker in sectionMarkers"
        :key="marker.id"
        class="absolute w-full"
        :style="{
          top: `${marker.startPercent * 100}%`,
          height: `${(marker.endPercent - marker.startPercent) * 100}%`,
        }"
      >
        <!-- start marker line -->
        <div class="absolute top-0 left-1/2 h-px w-3 -translate-x-full bg-gray-500" />

        <!-- text label -->
        <div class="absolute top-1/2 left-full flex h-full -translate-y-1/2 items-center">
          <span
            class="ml-1 origin-top-left -rotate-90 text-xs text-gray-600 whitespace-nowrap"
          >
            {{ marker.name }}
          </span>
        </div>

        <!-- end marker line -->
        <div class="absolute bottom-0 left-1/2 h-px w-3 -translate-x-full bg-gray-500" />
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
