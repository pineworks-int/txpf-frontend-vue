import type { ProjectProps } from '@/types/project.type'
import { ref } from 'vue'
import supabase from '@/lib/supabase'

export function useProjects() {
  const projects = ref<ProjectProps[]>([])
  const isLoading = ref(false)
  const error = ref<Error | null>(null)

  const fetchProjects = async () => {
    try {
      isLoading.value = true
      error.value = null

      const { data: fetchedProjects, error: fetchError } = await supabase
        .from('perso_projects')
        .select('title, description, technologies, image_url, demo_url, github_repo_url, github_project_url')

      if (fetchError) {
        throw new Error(fetchError.message)
      }

      if (!fetchedProjects) {
        projects.value = []
        return
      }

      const transformedProjects = fetchedProjects.map((project) => {
        return {
          title: project.title,
          description: project.description,
          technologies: project.technologies,
          imageUrl: project.image_url,
          demoUrl: project.demo_url,
          githubRepoUrl: project.github_repo_url,
          githubProjectUrl: project.github_project_url,
        }
      })

      projects.value = transformedProjects
    }
    catch (err) {
      if (err instanceof Error) {
        error.value = err
      }
      console.error('Error fetching projects:', err)
    }
    finally {
      isLoading.value = false
    }
  }

  return {
    projects,
    isLoading,
    error,
    fetchProjects,
  }
}
