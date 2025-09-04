<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

// Reactive state variables
const isPageLoaded = ref(false)
const isHovered = ref(false)
const isTextDisplayed = ref(false)
const hasInitialPlayed = ref(false)

// Animation trigger logic
const shouldSlideIn = computed(() => {
  return isPageLoaded.value && !hasInitialPlayed.value
})

const shouldSlideOut = computed(() => {
  return !isHovered.value && isTextDisplayed.value && hasInitialPlayed.value
})

const isPageLoadAnimation = computed(() => {
  return isPageLoaded.value && !hasInitialPlayed.value && !isHovered.value
})

// Event handlers
function handleMouseEnter() {
  isHovered.value = true
}

function handleMouseLeave() {
  isHovered.value = false
}

// Handle animation start
function handleAnimationStart() {
  if (shouldSlideIn.value) {
    isTextDisplayed.value = true
  }
}

// Handle animation end
function handleAnimationEnd(event: AnimationEvent) {
  if (event.animationName.startsWith('slideOut')) {
    isTextDisplayed.value = false
  }

  if (event.animationName.startsWith('pageLoadSequence')) {
    isTextDisplayed.value = false
    hasInitialPlayed.value = true
  }
}

// Page load trigger
onMounted(() => {
  setTimeout(() => {
    isPageLoaded.value = true
  }, 100)
})
</script>

<template>
  <div
    class="w-6 h-7 md:h-10 -my-2 flex items-center cursor-pointer"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <!-- ~ Tree Icon ~ -->
    <img
      src="/tree-only.svg"
      alt="Tree Logo"
      class="w-6 h-7 md:h-10 icon"
      :class="{
        'icon-page-load': isPageLoadAnimation,
        'icon-hover-static': isHovered && hasInitialPlayed,
        'icon-slide-out': shouldSlideOut,
      }"
    >

    <!-- ~ Text Container ~ -->
    <div
      class="flex flex-col text-sm font-bold text-container"
      :class="{
        'slide-in': shouldSlideIn && !shouldSlideOut,
        'slide-out': shouldSlideOut,
        'page-load': isPageLoadAnimation,
        'hover-visible': isHovered && hasInitialPlayed,
      }"
      @animationstart="handleAnimationStart"
      @animationend="handleAnimationEnd"
    >
      <svg viewBox="0 0 157.69 76.465" class="svg-text">
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="2%" style="stop-color:#fffd23;stop-opacity:0.8" />
            <stop offset="10%" style="stop-color:#95ed13;stop-opacity:0.8" />
            <stop offset="50%" style="stop-color:#11db00;stop-opacity:1" />
          </linearGradient>
        </defs>
        <path d="m1.6067 37.076v-35.574h5.4729l21.892 10.946-21.892 10.946v13.682zm5.4729-19.155 10.946-5.4729-10.946-5.4729zm26.104 19.155v-35.574h5.4729v35.574zm10.342-35.574h6.4581l18.17 25.723v-25.723h5.4729v35.574h-5.4729zm2.7912 30.101q1.1493 0 1.9703 0.79358 0.82094 0.79358 0.82094 1.8608 0 1.1767-0.82094 1.9976-0.82094 0.82094-1.9703 0.82094t-1.9155-0.82094q-0.76621-0.82094-0.76621-1.9976 0-1.0672 0.76621-1.8608 0.76621-0.79358 1.9155-0.79358zm32.179-24.628v-5.4729h24.628v5.4729zm0 30.101v-5.4729h24.628v5.4729zm5.4729-15.105v-5.4729h13.682v5.4729z" aria-label="Pine" />
        <path d="m1.6727 40.804h5.2435v23.596q0 2.2022 1.5206 3.7229 1.5206 1.5206 3.7229 1.5206h2.6217v-28.839h5.2435v28.839h2.6217q2.0974 0 3.6704-1.5206 1.573-1.5206 1.573-3.7229v-23.596h5.2435v23.596q0 4.6142-3.1985 7.5506-3.1985 2.9363-7.2884 2.9363h-10.487q-4.1948 0-7.3408-2.9363-3.1461-2.9363-3.1461-7.5506zm43.928 7.8127q4.0637 0 6.8165 2.6217 2.7528 2.5955 2.7528 6.2135 0 3.9326-2.7528 6.7641-2.7528 2.8052-6.6068 2.8052-3.9064 0-6.4494-2.8052-2.5169-2.8315-2.5169-6.7641 0-3.618 2.5169-6.2135 2.5431-2.6217 6.2397-2.6217zm13.306-2.5693v-5.2435h20.974q4.824 0 7.2884 3.0412 2.4644 3.0412 2.4644 6.8165 0 4.0899-2.4644 6.9214-2.4644 2.8315-7.2884 2.8315h-7.8652v14.472h-5.2435v-14.472h-7.8652v-5.2435h20.974q2.5169 0 3.5131-1.206 0.99626-1.206 0.99626-3.3034 0-1.9925-0.99626-3.3034-0.99625-1.3109-3.5131-1.3109zm34.437 20.974v-5.9775l20.24-20.24h5.9775l-11.536 11.536 18.772 18.876-3.6704 3.6704-18.772-18.876zm36.535-20.974v-5.2435h26.217v5.2435h-19.611l19.611 23.596v5.2435h-26.217v-5.2435h19.611z" aria-label="Works" />
      </svg>
    </div>
  </div>
</template>

<style scoped>
.hover-visible {
  opacity: 1 !important;
  transform: translateX(0) !important;
  transition: all 0.3s ease-out;
}

.icon-hover-static {
  transform: rotate(-30deg);
  transition: transform 0.6s ease-out;
}

.icon {
  transform-origin: bottom center;
  transition: transform 0.6s ease-out; /* Add this line */
}

/* Tree rotates during page load animation */
.icon-page-load {
  animation: treePageLoad 3s ease-out forwards;
}

/* Tree rotates back during slide out */
.icon-slide-out {
  animation: treeRotateOut 0.5s ease-in forwards;
}

/* Text Slide In Animation */
.slide-in {
  animation: slideInWithMomentum 0.8s ease-out forwards;
}

/* Page load specific animation - takes priority */
.slide-in.page-load {
  animation: pageLoadSequence 3s ease-out forwards !important;
}

/* Text Slide Out Animation */
.slide-out {
  animation: slideOut 0.5s ease-in forwards;
}

.svg-text {
  fill: url(#logoGradient) !important;
  stroke: url(#logoGradient) !important;
  stroke-width: 1 !important;
  width: 80px !important;
  height: auto !important;
  filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.3));
}
@media (max-width: 768px) {
  .svg-text {
    width: 50px !important;
    height: auto !important;
  }
}

.text-container {
  opacity: 0;
  transform: translateX(-100vw);
  transition: all 0.3s ease-out;
}

/* Keyframes remain the same */
@keyframes slideInWithMomentum {
  0% {
    opacity: 0;
    transform: translateX(-100vw);
  }
  70% {
    opacity: 1;
    transform: translateX(8px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideOut {
  0% {
    opacity: 1;
    transform: translateX(0);
  }
  100% {
    opacity: 0;
    transform: translateX(-100vw);
  }
}

@keyframes pageLoadSequence {
  0% {
    opacity: 0;
    transform: translateX(-100vw);
  }
  20% {
    opacity: 1;
    transform: translateX(8px);
  }
  27% {
    opacity: 1;
    transform: translateX(0);
  }
  83% {
    opacity: 1;
    transform: translateX(0);
  }
  100% {
    opacity: 0;
    transform: translateX(-100vw);
  }
}

@keyframes treePageLoad {
  0% {
    transform: rotate(0deg);
  }
  20% {
    transform: rotate(-45deg);
  }
  83% {
    transform: rotate(-45deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
</style>
