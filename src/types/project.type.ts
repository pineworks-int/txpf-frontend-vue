export interface ProjectProps {
  title: string
  description: string
  technologies: string[]
  imageUrl: string
  demoUrl: string
  githubRepoUrl: string
  githubProjectUrl: string
}

export interface ProjectStaticData {
  [id: string]: {
    url: string
    description: string
  }
}
