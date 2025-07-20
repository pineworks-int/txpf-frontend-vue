export interface ProjectProps {
  id: string
  title: string
  description: string
  technologies: string[]
  imageUrl: string
  demoUrl: string
  githubRepoUrl: string
  githubProjectUrl: string
  videos?: ProjectVideo[]
  screenshots?: ProjectScreenshot[]
}

export interface ProjectStaticData {
  [id: string]: {
    url: string
    description: string
  }
}

interface ProjectVideo {
  id: string
  title: string
  url: string
  thumbnail: string
}

interface ProjectScreenshot {
  id: string
  title: string
  url: string
}
