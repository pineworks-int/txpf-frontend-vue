export interface Content {
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
  nav: {
    uiLinks: {
      label: string
      url: string
    }[]
  }
}
