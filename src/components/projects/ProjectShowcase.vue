<script setup lang="ts">
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import ProjectCard from '@/components/projects/ProjectCard.vue';
import { useProjectsStore } from '@/stores/projects';
import { useProjects } from '@/composables/useProjects';

const projectsStore = useProjectsStore();
const { projects, isLoading, error } = storeToRefs(projectsStore);
const { fetchProjects } = useProjects();

onMounted(() => {
  fetchProjects();
});
</script>

<template>
  <section class="py-12">
    <h2 class="text-3xl font-bold text-center mb-8">
      My Personal Projects
    </h2>
    <!-- * if loading -->
    <div
      v-if="isLoading"
      class="text-center"
    >
      <p>Loading projects...</p>
    </div>
    <!-- * if error -->
    <div
      v-else-if="error"
      class="text-center text-red-500"
    >
      <p>Oops! Something went wrong: {{ error.message }}</p>
    </div>
    <!-- * if success -->
    <div
      v-else-if="projects.length > 0"
      class="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      <ProjectCard v-for="project in projects" :key="project.title" v-bind="project" />
    </div>
    <!-- * if empty -->
    <div v-else class="text-center">
      <p>No projects found.</p>
    </div>
  </section>
</template>

<style scoped>
.container {
  max-width: 1200px;
}
</style>
