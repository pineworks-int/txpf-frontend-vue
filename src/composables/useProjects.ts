import supabase from '@/lib/supabase'
import { useProjectsStore } from '@/stores/projects'

export function useProjects() {
  const projectsStore = useProjectsStore()

  const fetchProjects = async () => {
    try {
      projectsStore.setLoading(true)
      projectsStore.setError(null)

      const { data: fetchedProjects, error: fetchError } = await supabase
        .from('perso_projects')
        .select('id, title, description, technologies, image_url, demo_url, github_repo_url, github_project_url, videos, screenshots')

      if (fetchError) {
        throw new Error(fetchError.message)
      }

      if (!fetchedProjects) {
        projectsStore.setProjects([])
        return
      }

      const transformedProjects = fetchedProjects.map(project => ({
        id: project.id,
        title: project.title,
        description: project.description,
        technologies: project.technologies,
        imageUrl: project.image_url,
        demoUrl: project.demo_url,
        githubRepoUrl: project.github_repo_url,
        githubProjectUrl: project.github_project_url,
        videos: project.videos,
        screenshots: project.screenshots,
      }))

      projectsStore.setProjects(transformedProjects)
    }
    catch (err) {
      if (err instanceof Error) {
        projectsStore.setError(err)
      }
      console.error('Error fetching projects:', err)
    }
    finally {
      projectsStore.setLoading(false)
    }
  }

  return {
    fetchProjects,
  }
}
