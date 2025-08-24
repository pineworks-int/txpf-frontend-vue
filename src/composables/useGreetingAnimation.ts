import { computed, onMounted, onUnmounted, readonly, ref } from 'vue'
import staticData from '@/data/static.json'

const MESSAGES = staticData.content.en.hero.greetingAnimation

export function useGreetingAnimation(initialIsLoggedIn: boolean, initialUserType: 'mainUser' | 'guestUser' | 'unknownUser') {
  const line1 = ref('')
  const line2 = ref('')
  const line3 = ref('')

  let animationId = 0
  let currentAnimationId = 0

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

  // State
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

  // Typewriter with blinking cursor
  const typeText = async (text: string, targetRef: any, speed: number, animId: number) => {
    targetRef.value = ''
    for (let i = 0; i <= text.length; i++) {
      if (currentAnimationId !== animId)
        return false

      const currentText = text.slice(0, i)
      const showCursor = Math.floor(Date.now() / 300) % 2 === 0
      targetRef.value = currentText + (showCursor ? '█' : ' ')

      await new Promise(resolve => setTimeout(resolve, speed))
      if (currentAnimationId !== animId)
        return false
    }
    targetRef.value = text
    return true
  }

  const eraseText = async (targetRef: any, speed: number, animId: number) => {
    const originalText = targetRef.value
    for (let i = originalText.length; i >= 0; i--) {
      if (currentAnimationId !== animId)
        return false

      const currentText = originalText.slice(0, i)
      targetRef.value = currentText

      await new Promise(resolve => setTimeout(resolve, speed))
      if (currentAnimationId !== animId)
        return false
    }
    targetRef.value = ''
    return true
  }

  const wait = async (ms: number, animId: number) => {
    await new Promise(resolve => setTimeout(resolve, ms))
    return currentAnimationId === animId
  }

  // Main animation cycle
  const runAnimation = async () => {
    const animId = ++animationId
    currentAnimationId = animId

    const messages = currentMessages.value

    // Line 1: Type and keep
    if (!(await typeText(messages.line1, line1, 30, animId)))
      return
    if (!(await wait(500, animId)))
      return

    // Line 2a: Type first part
    if (!(await typeText(messages.line2a, line2, 30, animId)))
      return
    if (!(await wait(1500, animId)))
      return

    // Line 2b: Erase and type second part
    if (!(await eraseText(line2, 20, animId)))
      return
    if (!(await typeText(messages.line2b, line2, 30, animId)))
      return
    if (!(await wait(500, animId)))
      return

    // Line 3: Type third line
    if (!(await typeText(messages.line3, line3, 30, animId)))
      return
    if (!(await wait(10000, animId)))
      return

    // Erase all
    const erasePromises = [
      eraseText(line1, 30, animId),
      eraseText(line2, 30, animId),
      eraseText(line3, 30, animId),
    ]

    const results = await Promise.all(erasePromises)
    if (!results.every(result => result))
      return

    // Restart cycle
    if (currentAnimationId === animId) {
      setTimeout(() => {
        if (currentAnimationId === animId) {
          runAnimation()
        }
      }, 500)
    }
  }

  const startAnimation = () => {
    line1.value = ''
    line2.value = ''
    line3.value = ''
    runAnimation()
  }

  const stopAnimation = () => {
    currentAnimationId = ++animationId
  }

  const restartWithNewData = (newIsLoggedIn: boolean, newUserType: 'mainUser' | 'guestUser' | 'unknownUser') => {
    stopAnimation()
    isUserLoggedIn.value = newIsLoggedIn
    userType.value = newUserType
    line1.value = ''
    line2.value = ''
    line3.value = ''
    startAnimation()
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
