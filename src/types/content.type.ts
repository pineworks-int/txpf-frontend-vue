export interface Content {
  hero: {
    title: string
    subtitle: string
    greetingAnimation: {
      timeStatus: {
        morning: string
        noon: string
        afternoon: string
        evening: string
      }
      loginStatus: {
        loggedIn: {
          part1: string
          part2: string
        }
        notLoggedIn: {
          part1: string
          part2: string
        }
      }
      userGreeting: {
        [time: string]: {
          [userType: string]: {
            line3: string
          }
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
