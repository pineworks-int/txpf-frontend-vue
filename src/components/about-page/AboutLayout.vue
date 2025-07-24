<script setup lang="ts">
import AboutExperiences from '@/components/about-page/AboutExperiences.vue'
import AboutFooter from '@/components/about-page/AboutFooter.vue'
import AboutHeader from '@/components/about-page/AboutHeader.vue'
import AboutSidebar from '@/components/about-page/AboutSidebar.vue'
import AboutTimeline from '@/components/about-page/AboutTimeline.vue'
</script>

<template>
  <div class="w-full min-h-screen bg-gray-50">
    <!-- ~ Header ~ -->
    <div
      class="
        fixed
        flex
        items-start
        left-0
        right-0
        top-0
        h-16
        z-30
        md:h-24
        lg:h-40
        bg-purple-100
        border border-purple-500
      "
    >
      <AboutHeader />
    </div>

    <!-- ~ Sidebar ~ -->
    <div
      class="
        hidden
        fixed
        left-0
        top-40
        bottom-0
        z-20
        lg:block
        lg:w-72
        bg-blue-100
        border border-blue-500
      "
    >
      <AboutSidebar />
    </div>

    <!-- ~ Timeline ~ -->
    <!-- * Mobile/Tablet -->
    <div
      class="
        block
        fixed
        left-0
        top-16
        bottom-16
        w-12
        z-10
        md:top-24
        lg:hidden
        bg-red-100
        border border-red-500
      "
    >
      <AboutTimeline />
    </div>
    <!-- * Desktop -->
    <div
      class="
        hidden
        fixed
        top-40
        bottom-0
        w-16
        z-10
        lg:block
        lg:left-72
        bg-red-100
        border border-red-500
      "
    >
      <AboutTimeline />
    </div>

    <!-- ~ Footer ~ -->
    <div
      class="
        block
        fixed
        left-0
        right-0
        bottom-0
        h-16
        z-30
        lg:hidden
        bg-yellow-100
        border border-yellow-500
      "
    >
      <AboutFooter />
    </div>

    <!-- ~ Body ~ -->
    <div
      class="
        relative
        overflow-y-auto
        min-h-screen
        pl-12
        pt-16
        pb-16
        md:pl-12
        md:pt-24
        lg:pl-88
        lg:pr-0
        lg:pt-40
        lg:pb-0
        bg-green-100
        border border-green-500
      "
      style="margin-left: 0; margin-right: 0;"
    >
      <AboutExperiences />
    </div>
  </div>
</template>

<style lang="css" scoped>

</style>
