<script setup lang="ts">
import type { ProjectProps } from '@/types/project.type'
import { ref } from 'vue'
import ProjectCard from './ProjectCard.vue'

const mockProjects = ref<ProjectProps[]>([
  {
    title: 'My First Awesome Project',
    description: 'This is a detailed description of the project. It uses cutting-edge technologies to solve a real-world problem.',
    technologies: ['Vue.js', 'TypeScript', 'TailwindCSS'],
    imageUrl: 'https://via.assets.so/img.jpg?w=400&h=200&tc=blue&bg=#cecece', // A temporary placeholder image
    demoUrl: '#',
    githubRepoUrl: '#',
    githubProjectUrl: '#',
  },
  {
    title: 'My Second Awesome Project',
    description: 'This is a detailed description of the project. It uses cutting-edge technologies to solve a real-world problem.',
    technologies: ['Nest.js', 'TypeScript', 'PostgreSQL'],
    imageUrl: 'https://via.assets.so/img.jpg?w=400&h=200&tc=blue&bg=#cecece', // A temporary placeholder image
    demoUrl: '#',
    githubRepoUrl: '#',
    githubProjectUrl: '#',
  },
])
</script>

<template>
  <section class="py-12">
    <h2 class="text-3xl font-bold text-center mb-8">
      My Projects
    </h2>
    <div class="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <ProjectCard v-for="project in mockProjects" :key="project.title" v-bind="project" />
    </div>
  </section>
</template>

<style scoped>
.container {
  max-width: 1200px;
}
</style>
