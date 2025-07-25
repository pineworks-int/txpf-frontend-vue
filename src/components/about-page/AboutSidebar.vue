<script setup lang="ts">
import { computed } from 'vue'
import SidebarIconRowItem from '@/components/about-page/ui/sidebar/SidebarIconRowItem.vue'
import SidebarItem from '@/components/about-page/ui/sidebar/SidebarItem.vue'
import SidebarLinkItem from '@/components/about-page/ui/sidebar/SidebarLinkItem.vue'
import SidebarSection from '@/components/about-page/ui/sidebar/SidebarSection.vue'
import { useContentStore } from '@/stores/content'

const contentStore = useContentStore()

const sidebarContent = computed(() => {
  const lang = contentStore.currentLanguage
  const data = contentStore.getContentText('about-me.sidebar')

  return {
    sections: data.sections[lang],
    hardskillsSubs: data.hardskillsSubs[lang],
    softskillsContent: data.softskillsContent[lang],
    languagesContent: data.languagesContent[lang],
    hobbiesContent: data.hobbiesContent[lang],
  }
})

const contactInfo = [
  { iconKey: 'mail', text: 'link', href: 'mailto:' },
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
</script>

<template>
  <div v-if="sidebarContent.sections" class="h-full w-full p-4 overflow-y-auto">
    <SidebarSection :title="sidebarContent.sections.contact">
      <div class="space-y-3 ml-2">
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
    </SidebarSection>
    <SidebarSection :title="sidebarContent.sections.hardskills">
      <div class="space-y-3 ml-2">
        <div v-for="subsection in hardSkills" :key="subsection.title">
          <h4 class="text-xs font-semibold text-gray-600 mb-2">
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
            class="flex flex-row space-x-4 ml-2"
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
    </SidebarSection>
    <SidebarSection :title="sidebarContent.sections.softskills" :items="softSkills" />
    <SidebarSection :title="sidebarContent.sections.languages" :items="languages" />
    <SidebarSection :title="sidebarContent.sections.hobbies" :items="hobbies" />
  </div>
</template>

<style lang="css" scoped>

</style>
