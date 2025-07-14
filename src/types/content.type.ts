export interface ContentBranch {
  hero: {
    title: string
    subtitle: string
    greetings: {
      [time: string]: {
        [userType: string]: {
          message: string
        }
      }
    }
  }
  navigation: {
    label: string
    url: string
  }[]
}
