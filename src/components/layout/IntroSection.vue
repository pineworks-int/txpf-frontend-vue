<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useMarkdown } from '@/composables/useMarkdown'
import { useContentStore } from '@/stores/content'

const contentStore = useContentStore()
const { getContent } = storeToRefs(contentStore)
const { parseMarkdown } = useMarkdown()
</script>

<template>
  <div class="max-w-4xl mx-auto p-6 space-y-8 bg-surface-1 rounded-lg">
    <!-- ~ Intro Section ~ -->
    <section class="text-center space-y-4">
      <h1 class="text-xl md:text-2xl italic text-primary-medium mb-4 font-oxanium">
        {{ getContent.body.intro.title }}
      </h1>
      <p class="text-content/90 leading-relaxed text-base mb-2 md:text-lg font-montserrat">
        {{ getContent.body.intro.content }}
      </p>
      <p class="text-content/90 leading-relaxed text-base md:text-lg italic font-montserrat">
        {{ getContent.body.intro.question }}
      </p>
    </section>

    <!-- ~ Separator ~ -->
    <div class="flex justify-center items-center py-6">
      <div class="w-32 h-px bg-gradient-to-r from-transparent via-primary-medium to-transparent glow-primary-sm" />
    </div>

    <!-- ~ Personal Introduction Section ~ -->
    <section class="space-y-6">
      <!-- Title -->
      <h1 class="text-2xl md:text-3xl font-bold text-primary-medium mb-4 text-center lg:text-left font-oxanium">
        {{ getContent.body.presentation.title }}
      </h1>

      <!-- ~ Photo placeholder for mobile ~ -->
      <div class="flex justify-center lg:hidden mb-6">
        <div class="relative p-1 rounded-lg bg-gradient-to-br from-primary-subtle to-primary-muted shadow-lg shadow-primary/20">
          <div class="w-44 h-60 bg-surface-2 rounded-md flex items-center justify-center relative overflow-hidden border border-primary-subtle/50">
            <span class="text-primary-subtle text-lg font-medium font-oxanium">Photo</span>
          </div>
        </div>
      </div>

      <!-- ~ Content Grid ~ -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div class="lg:col-span-2 space-y-4">
          <p
            class="text-content/90 leading-relaxed mb-4 text-base md:text-lg font-montserrat"
            v-html="parseMarkdown(getContent.body.presentation.content)"
          />
        </div>

        <!-- ~ Photo Placeholder for desktop ~ -->
        <div class="hidden lg:flex justify-end">
          <div class="relative p-1 rounded-lg bg-gradient-to-br from-primary-subtle to-primary-muted shadow-lg shadow-primary/20">
            <div class="w-44 h-60 bg-surface-2 rounded-md flex items-center justify-center relative overflow-hidden border border-primary-subtle/50">
              <span class="text-primary-subtle text-lg font-medium font-oxanium">Photo</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>

  <!-- ~ Separator ~ -->
  <div class="flex justify-center items-center py-6">
    <div class="w-32 h-px bg-gradient-to-r from-transparent via-primary-medium to-transparent glow-primary-sm" />
  </div>
</template>
