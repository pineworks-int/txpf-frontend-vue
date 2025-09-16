<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref } from 'vue'
import AboutExperiences from '@/components/about-page/AboutExperiences.vue'
import AboutFooter from '@/components/about-page/AboutFooter.vue'
import AboutHeader from '@/components/about-page/AboutHeader.vue'
import AboutPopover from '@/components/about-page/AboutPopover.vue'
import AboutSidebar from '@/components/about-page/AboutSidebar.vue'
import AboutTimeline from '@/components/about-page/AboutTimeline.vue'

// ~ Popover Logic ~
type PopoverContent = 'contact' | 'hardskills' | 'softskills' | 'other'
const isPopoverOpen = ref(false)
const popoverContentKey = ref<PopoverContent | null>(null)
const popoverTriggerElement = ref<HTMLElement | null>(null)
function openPopover(contentKey: PopoverContent, event: MouseEvent) {
  isPopoverOpen.value = true
  popoverContentKey.value = contentKey
  popoverTriggerElement.value = event.currentTarget as HTMLElement
}
function closePopover() {
  isPopoverOpen.value = false
  popoverContentKey.value = null
  popoverTriggerElement.value = null
}

// ~ Timeline & Section Marker Logic ~
const experiencesContainerRef = ref<HTMLElement | null>(null)
const mainContentRef = ref<HTMLElement | null>(null)
const contentAreaRef = ref<HTMLElement | null>(null)

const dotPercentage = ref(0)
const lastClientY = ref(0)
const sectionMarkers = ref<{ id: string, name: string, startPercent: number, endPercent: number }[]>([])

function updateSectionMarkers() {
  if (!experiencesContainerRef.value)
    return
  const sections = experiencesContainerRef.value.querySelectorAll('section[id]')

  const totalHeight = experiencesContainerRef.value.offsetHeight

  const containerOffsetTop = experiencesContainerRef.value.offsetTop

  const markers = Array.from(sections).map((section) => {
    const htmlSection = section as HTMLElement
    const id = htmlSection.id
    const name = id.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())

    const relativeOffsetTop = htmlSection.offsetTop - containerOffsetTop
    const relativeEnd = relativeOffsetTop + htmlSection.offsetHeight

    const startPercent = relativeOffsetTop / totalHeight
    const endPercent = relativeEnd / totalHeight

    return { id, name, startPercent, endPercent }
  })
  sectionMarkers.value = markers
}

function updateDotPosition(currentY: number) {
  if (!experiencesContainerRef.value)
    return

  // Use experiencesContainerRef for both position AND height
  const experiencesRect = experiencesContainerRef.value.getBoundingClientRect()
  const totalHeight = experiencesContainerRef.value.offsetHeight

  const relativeY = currentY - experiencesRect.top
  const percentage = Math.max(0, Math.min(relativeY / totalHeight, 1))

  dotPercentage.value = percentage
}

// These handlers are now scoped correctly.
function handleMouseMove(event: MouseEvent) {
  lastClientY.value = event.clientY
  updateDotPosition(event.clientY)
}

function handleScroll() {
  updateDotPosition(lastClientY.value)
}

onMounted(() => {
  nextTick(() => {
    updateSectionMarkers()
  })
  window.addEventListener('scroll', handleScroll)
  if (contentAreaRef.value) {
    contentAreaRef.value.addEventListener('mousemove', handleMouseMove)
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  if (contentAreaRef.value) {
    contentAreaRef.value.removeEventListener('mousemove', handleMouseMove)
  }
})
</script>

<template>
  <div class="w-full min-h-screen bg-gray-50">
    <div
      class="fixed flex items-start left-0 right-0 top-0 h-16 md:h-24 lg:h-40 z-30 bg-purple-100 border border-purple-500"
    >
      <AboutHeader @open-popover="openPopover" />
    </div>
    <div
      class="hidden lg:block fixed left-0 top-40 bottom-0 lg:w-72 z-20 bg-blue-100 border border-blue-500"
    >
      <AboutSidebar />
    </div>
    <div
      class="block lg:hidden fixed left-0 top-16 md:top-24 bottom-16 w-12 z-10 bg-red-100 border border-red-500"
    >
      <AboutTimeline
        :dot-percentage="dotPercentage"
        :section-markers="sectionMarkers"
      />
    </div>
    <div
      class="hidden lg:block fixed lg:left-72 top-40 bottom-0 w-16 z-10 bg-red-100 border border-red-500"
    >
      <AboutTimeline
        :dot-percentage="dotPercentage"
        :section-markers="sectionMarkers"
      />
    </div>
    <div
      class="block lg:hidden fixed left-0 right-0 bottom-0 h-16 z-30 bg-yellow-100 border border-yellow-500"
    >
      <AboutFooter @open-popover="openPopover" />
    </div>
    <AboutPopover
      :is-open="isPopoverOpen"
      :content-key="popoverContentKey"
      :trigger-element="popoverTriggerElement"
      @close="closePopover"
    />
    <div
      ref="mainContentRef"
      class="relative overflow-y-auto min-h-screen bg-green-100 border border-green-500"
    >
      <div ref="contentAreaRef" class="pl-12 lg:pl-88 pt-16 md:pt-24 lg:pt-40 pb-16 lg:pb-0">
        <div ref="experiencesContainerRef">
          <AboutExperiences />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
