<script setup lang="ts">
import { getIcon } from '@/lib/icons'

const projects = [
  {
    title: 'Interactive 3D Product Visualizer',
    description: 'An interactive 3D model viewer using Three.js, allowing users to customize and inspect products in real-time.',
    insight: 'The main challenge was to create a performant and photorealistic rendering experience on the web. I led the effort to optimize 3D models from Blender and developed a custom GLSL shader to achieve the desired look and feel while maintaining a smooth frame rate, which increased user engagement by 40%.',
    technologies: ['threejs', 'javascript', 'blender', 'glsl'],
    links: {
      github: 'https://github.com/user/repo',
      live: '#',
    },
  },
  {
    title: 'Full-Stack Task Management App',
    description: 'A robust application with a Symfony backend and a Vue.js frontend for managing team tasks and projects.',
    insight: 'This project was an exercise in building a secure and scalable full-stack system. I was responsible for designing the REST API architecture in Symfony and implementing a token-based authentication system. This provided a solid foundation that allowed the team to build new features quickly and securely.',
    technologies: ['php', 'symfony', 'vuejs', 'postgres', 'api'],
    links: {
      github: 'https://github.com/user/repo',
      live: '#',
    },
  },
]
</script>

<template>
  <section id="featured-projects" class="p-8 bg-white rounded-lg shadow-md">
    <h2 class="text-2xl font-bold text-gray-800 mb-6">
      Featured Projects - The Skills
    </h2>

    <div class="space-y-12">
      <article v-for="project in projects" :key="project.title" class="flex flex-col md:flex-row gap-8">
        <div class="md:w-1/3">
          <div class="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
            <span class="text-gray-400">Project Image</span>
          </div>
        </div>

        <div class="md:w-2/3">
          <h3 class="text-xl font-semibold text-gray-900">
            {{ project.title }}
          </h3>
          <p class="text-gray-600 mt-2">
            {{ project.description }}
          </p>

          <blockquote class="mt-4 p-4 bg-purple-50 border-l-4 border-purple-400 text-purple-800">
            {{ project.insight }}
          </blockquote>

          <div class="mt-4 flex flex-wrap gap-2">
            <span
              v-for="tech in project.technologies"
              :key="tech"
              class="flex items-center bg-gray-100 text-gray-700 text-xs font-medium px-2.5 py-1 rounded-full"
            >
              <span v-if="getIcon(tech)" class="w-4 h-4 mr-1.5" v-html="getIcon(tech)" />
              {{ tech }}
            </span>
          </div>

          <footer class="mt-4 flex items-center space-x-4">
            <a
              :href="project.links.github"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center text-sm text-gray-500 hover:text-blue-600 transition-colors"
            >
              <span class="w-5 h-5 mr-1" v-html="getIcon('github')" />
              GitHub
            </a>
            <a
              :href="project.links.live"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center text-sm text-gray-500 hover:text-blue-600 transition-colors"
            >
              <span class="w-5 h-5 mr-1" v-html="getIcon('a_link')" />
              Live Demo
            </a>
          </footer>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
</style>
