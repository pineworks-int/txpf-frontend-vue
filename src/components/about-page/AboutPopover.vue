<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed, nextTick, ref, watch } from 'vue'
import SidebarIconRowItem from '@/components/about-page/ui/sidebar/SidebarIconRowItem.vue'
import SidebarItem from '@/components/about-page/ui/sidebar/SidebarItem.vue'
import SidebarLinkItem from '@/components/about-page/ui/sidebar/SidebarLinkItem.vue'
import SidebarSection from '@/components/about-page/ui/sidebar/SidebarSection.vue'
import { getIcon } from '@/lib/icons'
import { useContentStore } from '@/stores/content'

const props = defineProps<{
  isOpen: boolean
  contentKey: 'contact' | 'hardskills' | 'softskills' | 'other' | null
  triggerElement: HTMLElement | null
}>()

const emit = defineEmits(['close'])

const contentStore = useContentStore()
const { getContent } = storeToRefs(contentStore)

// ~-- Data Structures ---
const sidebarContent = computed(() => {
  return getContent.value['about-me']?.sidebar || {}
})

const contactInfo = [
  { iconKey: 'mail', text: 'xxxx@xxxxxx.xxxx', href: 'mailto:xxxx@xxxxxx.xxxx' },
  { iconKey: 'phone', text: '+XX X XX XX XX XX', textToCopy: '+XXXXXXXXXXXX' },
  { iconKey: 'linkedin', text: 'linkedin', href: 'https://www.linkedin.com' },
  { iconKey: 'github', text: 'github', href: 'https://github.com' },
  { iconKey: 'pin', text: 'France', href: '' },
]

const hardSkills = computed(() => [
  {
    title: sidebarContent.value.hardskillsSubs.frontend,
    items: [
      { iconKey: 'vuejs', text: 'Vue.js / Nuxt' },
      { iconKey: 'threejs', text: 'Three.js' },
      { iconKey: 'tailwindcss', text: 'Tailwind CSS' },
    ],
  },
  {
    title: sidebarContent.value.hardskillsSubs.backend,
    items: [
      { iconKey: '🐘', text: 'PHP / Symfony' },
      { iconKey: '🐍', text: 'Python / Django' },
    ],
  },
  {
    title: sidebarContent.value.hardskillsSubs.database,
    items: [
      { iconKey: 'postgres', text: 'PostgreSQL' },
      { iconKey: 'mongodb', text: 'MongoDB' },
    ],
  },
  {
    title: sidebarContent.value.hardskillsSubs.tools,
    items: [
      { iconKey: 'git', text: 'Git' },
      { iconKey: 'docker', text: 'Docker' },
      { iconKey: 'blender', text: 'Blender' },
      { iconKey: 'figma', text: 'Figma' },
      { iconKey: 'inkscape', text: 'Inkscape' },
    ],
  },
  {
    title: sidebarContent.value.hardskillsSubs.os,
    items: [
      { iconKey: 'archlinux', text: 'Linux/Arch' },
      { iconKey: 'mac', text: 'MacOS' },
      { iconKey: 'windows', text: 'Windows' },
    ],
  },
])

const softSkills = computed(() => [
  { iconKey: 'maze', text: sidebarContent.value.softskillsContent.strategic },
  { iconKey: 'toolbox', text: sidebarContent.value.softskillsContent.adaptable },
  { iconKey: 'talk', text: sidebarContent.value.softskillsContent.communicative },
  { iconKey: 'empathy', text: sidebarContent.value.softskillsContent.empathetic },
  { iconKey: 'persistent', text: sidebarContent.value.softskillsContent.persistent },
  { iconKey: 'shiny', text: sidebarContent.value.softskillsContent.perfectionist },
])

const languages = computed(() => [
  { iconKey: 'fr_flag_c', text: sidebarContent.value.languagesContent.french },
  { iconKey: 'en_flag_c', text: sidebarContent.value.languagesContent.english },
])

const hobbies = computed(() => [
  { iconKey: 'guitar', text: sidebarContent.value.hobbiesContent.guitar },
  { iconKey: 'astronomy', text: sidebarContent.value.hobbiesContent.astro },
  { iconKey: 'scifi', text: sidebarContent.value.hobbiesContent.scifi },
  { iconKey: 'volley', text: sidebarContent.value.hobbiesContent.volley },
  { iconKey: 'sail', text: sidebarContent.value.hobbiesContent.sail },
  { iconKey: 'paraglide', text: sidebarContent.value.hobbiesContent.glide },
  { iconKey: 'mountains', text: sidebarContent.value.hobbiesContent.mountains },
  { iconKey: 'linux', text: sidebarContent.value.hobbiesContent.open_source },
  { iconKey: 'hardware', text: sidebarContent.value.hobbiesContent.hardware },
  { iconKey: 'coding', text: sidebarContent.value.hobbiesContent.code },
])
// ~-- End of Data Structures ---

const currentTitle = computed(() => {
  if (!props.contentKey || !sidebarContent.value.sections)
    return ''
  switch (props.contentKey) {
    case 'contact':
      return sidebarContent.value.sections?.contact || 'Contact'
    case 'hardskills':
      return sidebarContent.value.sections?.hardskills || 'Hard Skills'
    case 'softskills':
      return sidebarContent.value.sections?.softskills || 'Soft Skills'
    case 'other':
      return 'Others'
    default:
      return ''
  }
})

// ~-- Positioning Logic ---
const popoverRef = ref<HTMLElement | null>(null)
const popoverStyle = ref({ top: '0px', left: '0px' })
const arrowStyle = ref({ top: '', bottom: '', left: '0px' })
const placement = ref<'top' | 'bottom'>('bottom')

async function updatePosition() {
  if (!props.triggerElement || !popoverRef.value)
    return

  await nextTick()

  const triggerRect = props.triggerElement.getBoundingClientRect()
  const popoverRect = popoverRef.value.getBoundingClientRect()
  const arrowSize = 16 // w-4/h-4
  const spacing = 8 // 0.5rem

  placement.value = triggerRect.top > window.innerHeight / 2 ? 'top' : 'bottom'

  let top: number
  let left = triggerRect.left + triggerRect.width / 2 - popoverRect.width / 2

  const margin = 16 // 1rem
  if (left < margin)
    left = margin

  if (left + popoverRect.width > window.innerWidth - margin)
    left = window.innerWidth - popoverRect.width - margin

  if (placement.value === 'top') {
    top = triggerRect.top - popoverRect.height - spacing
    arrowStyle.value = { top: 'auto', bottom: `${-arrowSize / 2}px`, left: '0px' }
  }
  else {
    top = triggerRect.bottom + spacing
    arrowStyle.value = { top: `${-arrowSize / 2}px`, bottom: 'auto', left: '0px' }
  }

  popoverStyle.value = { top: `${top}px`, left: `${left}px` }

  const arrowLeft = triggerRect.left + triggerRect.width / 2 - left - arrowSize / 2
  arrowStyle.value.left = `${arrowLeft}px`
}

watch(() => props.isOpen, async (newValue) => {
  if (newValue) {
    await nextTick()
    updatePosition()
    window.addEventListener('resize', updatePosition)
  }
  else {
    window.removeEventListener('resize', updatePosition)
  }
})
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen"
        class="fixed inset-0 z-40"
        @click.self="emit('close')"
      >
        <!-- ~ Popover Content -->
        <Transition
          enter-active-class="transition-all duration-300 ease-out"
          :enter-from-class="`opacity-0 scale-95 ${placement === 'top' ? 'translate-y-4' : '-translate-y-4'}`"
          enter-to-class="opacity-100 scale-100 translate-y-0"
          leave-active-class="transition-all duration-200 ease-in"
          leave-from-class="opacity-100 scale-100 translate-y-0"
          :leave-to-class="`opacity-0 scale-95 ${placement === 'top' ? 'translate-y-4' : '-translate-y-4'}`"
        >
          <div
            v-if="isOpen"
            ref="popoverRef"
            :style="popoverStyle"
            class="absolute z-50 flex max-h-[60vh] min-w-64 max-w-sm flex-col rounded-xl bg-gray-50 shadow-2xl border border-gray-200"
          >
            <!-- # Header -->
            <div class="flex items-center justify-between border-b p-4">
              <h3 class="text-xl font-semibold">
                {{ currentTitle }}
              </h3>
              <button
                class="rounded-full p-1 text-2xl text-gray-500 transition-colors hover:bg-gray-200 hover:text-gray-800"
                aria-label="Close popover"
                @click="emit('close')"
                v-html="getIcon('a_close')"
              />
            </div>

            <!-- # Body -->
            <div class="flex-1 overflow-y-auto p-4">
              <!-- => Contact Section -->
              <div v-if="contentKey === 'contact'">
                <div class="ml-2 space-y-3">
                  <div class="space-y-2">
                    <SidebarLinkItem
                      v-for="item in contactInfo"
                      :key="item.text"
                      :icon-key="item.iconKey"
                      :text="item.text"
                      :href="item.href"
                      :text-to-copy="item.textToCopy"
                    />
                  </div>
                </div>
              </div>
              <!-- => Hard Skills Section -->
              <div v-if="contentKey === 'hardskills'">
                <div class="ml-2 space-y-3">
                  <div v-for="subsection in hardSkills" :key="subsection.title">
                    <h4 class="mb-2 text-xs font-semibold text-gray-600">
                      {{ subsection.title }}
                    </h4>
                    <div
                      v-if="subsection.title !== sidebarContent.hardskillsSubs.os"
                      class="space-y-1"
                    >
                      <SidebarItem
                        v-for="item in subsection.items"
                        :key="item.text"
                        :icon-key="item.iconKey"
                        :text="item.text"
                      />
                    </div>
                    <div
                      v-else
                      class="ml-2 flex flex-row space-x-4"
                    >
                      <SidebarIconRowItem
                        v-for="item in subsection.items"
                        :key="item.text"
                        :icon-key="item.iconKey"
                        :text="item.text"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <!-- => Soft Skills Section -->
              <div v-if="contentKey === 'softskills'">
                <div class="space-y-1">
                  <SidebarItem
                    v-for="item in softSkills"
                    :key="item.text"
                    :icon-key="item.iconKey"
                    :text="item.text"
                  />
                </div>
              </div>
              <!-- => Languages & Hobbies Section -->
              <div v-if="contentKey === 'other'">
                <SidebarSection :title="sidebarContent.sections.languages" :items="languages" />
                <SidebarSection :title="sidebarContent.sections.hobbies" :items="hobbies" />
              </div>
            </div>

            <!-- # Arrow / Pointer -->
            <div
              :style="arrowStyle"
              class="absolute w-4 h-4 bg-gray-50 transform rotate-45"
              :class="{
                'border-b border-r border-gray-200': placement === 'top',
                'border-t border-l border-gray-200': placement === 'bottom',
              }"
            />
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
</style>
