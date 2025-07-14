<script setup lang="ts">
import type { ProjectProps } from '@/types/project.type'

const props = defineProps<ProjectProps>()
</script>

<template>
  <div class="border rounded-lg p-4">
    <h3 class="text-lg font-bold">
      {{ props.title }}
    </h3>
    <img :src="props.imageUrl" :alt="props.title" class="">
    <p>{{ props.description }}</p>
    <p> Demo accessible at: <a :href="props.demoUrl" target="_blank">Click here to launch</a></p>
    <p> Github repo @ <a :href="props.githubRepoUrl" target="_blank">{{ props.githubRepoUrl }}</a></p>
    <p> Github project @ <a :href="props.githubProjectUrl" target="_blank">{{ props.githubProjectUrl }}</a></p>
    <div>
      Tech stack:
      <ul>
        <li v-for="tech in props.technologies" :key="tech">
          {{ tech }}
          <!-- TODO: Add tech logos later -->
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>

</style>
