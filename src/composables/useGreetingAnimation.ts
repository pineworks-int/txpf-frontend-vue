import { computed, onMounted, onUnmounted, readonly, ref } from 'vue'
import staticData from '@/data/static.json'

const MESSAGES = staticData.content.en.hero.greetingAnimation

export function useGreetingAnimation(initialIsLoggedIn: boolean, initialUserType: 'mainUser' | 'guestUser' | 'unknownUser') {
  const line1 = ref('')
  const line2 = ref('')
  const line3 = ref('')

  let animationInterval: NodeJS.Timeout | null = null
  let cycleTimeout: NodeJS.Timeout | null = null

  // Time range logic
  const timeRange = computed(() => {
    const hours = new Date().getHours()
    if (hours >= 6 && hours < 10)
      return 'morning'
    if (hours >= 10 && hours < 12)
      return 'noon'
    if (hours >= 13 && hours < 17)
      return 'afternoon'
    return 'evening'
  })

  const greetingTimeOfDay = computed(() => {
    const hours = new Date().getHours()
    if (hours >= 6 && hours < 12)
      return 'morning'
    if (hours >= 13 && hours < 17)
      return 'afternoon'
    return 'evening'
  })

  // Internal reactive state for user data
  const isUserLoggedIn = ref(initialIsLoggedIn)
  const userType = ref(initialUserType)

  // Map user types
  const mappedUserType = computed(() => {
    switch (userType.value) {
      case 'mainUser': return 'admin'
      case 'guestUser': return 'guest'
      case 'unknownUser': return 'unknown'
      default: return 'unknown'
    }
  })

  // Get current messages
  const currentMessages = computed(() => {
    const timeStatusMsg = MESSAGES.timeStatus[timeRange.value]
    const loginStatus = isUserLoggedIn.value ? MESSAGES.loginStatus.loggedIn : MESSAGES.loginStatus.notLoggedIn
    const userGreeting = MESSAGES.userGreeting[greetingTimeOfDay.value][mappedUserType.value]

    return {
      line1: timeStatusMsg,
      line2a: loginStatus.part1,
      line2b: loginStatus.part2,
      line3: userGreeting.line3,
    }
  })

  const typeText = (text: string, targetRef: any, speed: number = 30): Promise<void> => {
    return new Promise((resolve) => {
      let i = 0
      targetRef.value = ''

      const type = () => {
        if (i < text.length) {
          targetRef.value += text.charAt(i)
          i++
          setTimeout(type, speed)
        }
        else {
          resolve()
        }
      }
      type()
    })
  }

  const eraseText = (targetRef: any, speed: number = 20): Promise<void> => {
    return new Promise((resolve) => {
      const erase = () => {
        if (targetRef.value.length > 0) {
          targetRef.value = targetRef.value.slice(0, -1)
          setTimeout(erase, speed)
        }
        else {
          resolve()
        }
      }
      erase()
    })
  }

  const wait = (ms: number): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  const eraseAll = (): Promise<void> => {
    return Promise.all([
      eraseText(line1, 30),
      eraseText(line2, 30),
      eraseText(line3, 30),
    ]).then(() => {})
  }

  const isAnimationActive = ref(true)

  const runCycle = async () => {
    if (!isAnimationActive.value)
      return

    const messages = currentMessages.value

    try {
      // Line1: Type first line and keep displayed
      if (!isAnimationActive.value)
        return
      await typeText(messages.line1, line1)
      if (!isAnimationActive.value)
        return
      await wait(500)

      // Line2: Type first part
      if (!isAnimationActive.value)
        return
      await typeText(messages.line2a, line2)
      if (!isAnimationActive.value)
        return
      await wait(1500)

      // Line2: Erase and type second part
      if (!isAnimationActive.value)
        return
      await eraseText(line2)
      if (!isAnimationActive.value)
        return
      await typeText(messages.line2b, line2)
      if (!isAnimationActive.value)
        return
      await wait(500)

      // Line3: Type third line
      if (!isAnimationActive.value)
        return
      await typeText(messages.line3, line3)
      if (!isAnimationActive.value)
        return
      await wait(10000)

      // Erase all
      if (!isAnimationActive.value)
        return
      await eraseAll()

      // Repeat cycle
      if (isAnimationActive.value) {
        cycleTimeout = setTimeout(runCycle, 500)
      }
    }
    catch (error) {
      // Handle any errors during animation
      console.warn('Greeting animation interrupted:', error)
    }
  }

  const startAnimation = () => {
    isAnimationActive.value = true
    runCycle()
  }

  const stopAnimation = () => {
    isAnimationActive.value = false
    if (animationInterval) {
      clearInterval(animationInterval)
      animationInterval = null
    }
    if (cycleTimeout) {
      clearTimeout(cycleTimeout)
      cycleTimeout = null
    }
  }

  const restartWithNewData = (newIsLoggedIn: boolean, newUserType: 'mainUser' | 'guestUser' | 'unknownUser') => {
    // Immediately stop the animation flag to prevent any ongoing async operations
    isAnimationActive.value = false

    // Stop and clear everything
    stopAnimation()

    // Update internal state
    isUserLoggedIn.value = newIsLoggedIn
    userType.value = newUserType

    // Clear all lines immediately
    line1.value = ''
    line2.value = ''
    line3.value = ''

    // Wait for any ongoing async operations to complete, then start fresh
    setTimeout(() => {
      startAnimation()
    }, 500)
  }

  onMounted(() => {
    startAnimation()
  })

  onUnmounted(() => {
    stopAnimation()
  })

  return {
    line1: readonly(line1),
    line2: readonly(line2),
    line3: readonly(line3),
    startAnimation,
    stopAnimation,
    restartWithNewData,
  }
}
