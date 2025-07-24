<script setup lang="ts">
import SidebarItem from '@/components/about-page/ui/sidebar/SidebarItem.vue'
import SidebarLinkItem from '@/components/about-page/ui/sidebar/SidebarLinkItem.vue'
import SidebarSection from '@/components/about-page/ui/sidebar/SidebarSection.vue'

const contactInfo = [
  { iconKey: 'mail_p', text: 'link', href: 'mailto:' },
  { iconKey: 'phone_p', text: '+XX X XX XX XX XX', textToCopy: '+XXXXXXXXXXXX' },
  { iconKey: 'linkedin_p', text: 'linkedin', href: 'https://www.linkedin.com' },
  { iconKey: 'github_p', text: 'github', href: 'https://github.com' },
  { iconKey: 'pin_p', text: 'France', href: '' },
]

const hardSkills = {
  Frontend: [
    { iconKey: 'vuejs_plain', text: 'Vue.js / Nuxt' },
    { iconKey: 'threejs_plain', text: 'Three.js' },
    { iconKey: 'tailwindcss_plain', text: 'Tailwind CSS' },
  ],
  Backend: [
    { iconKey: '🐘', text: 'PHP / Symfony' },
    { iconKey: '🐍', text: 'Python / Django' },
  ],
  Databases: [
    { iconKey: 'postgres_plain', text: 'PostgreSQL' },
    { iconKey: 'mongodb_plain', text: 'MongoDB' },
  ],
  Systems: [
    { iconKey: 'archlinux_plain', text: 'Linux/Arch' },
    { iconKey: 'mac_plain', text: 'MacOS' },
    { iconKey: 'windows_plain', text: 'Windows' },
  ],
}

const softSkills = [
  { iconKey: 'maze_plain', text: 'Strategic' },
  { iconKey: 'toolbox_plain', text: 'Adaptable' },
  { iconKey: 'gear_plain', text: 'Optimizer' },
  { iconKey: 'shiny_plain', text: 'Perfectionist' },
  { iconKey: 'talk_plain', text: 'Communicative' },
  { iconKey: 'empathy_plain', text: 'Empathetic' },
  { iconKey: 'persistent_plain', text: 'Persistent' },
]

const languages = [
  { iconKey: 'fr_flag', text: 'French (Native)' },
  { iconKey: 'en_flag', text: 'English (C2/Pro)' },
]

const hobbies = [
  { iconKey: 'guitar_plain', text: 'Guitar' },
  { iconKey: 'astronomy_plain', text: 'Astronomy' },
  { iconKey: 'scifi_plain', text: 'Sci-Fi' },
  { iconKey: 'volley_plain', text: 'Volleyball' },
  { iconKey: 'sail_plain', text: 'Sailing' },
  { iconKey: 'paraglide_plain', text: 'Gliding' },
  { iconKey: 'mountains_plain', text: 'Mountains' },
  { iconKey: 'linux_plain', text: 'Open Source' },
  { iconKey: 'hardware_plain', text: 'Hardware' },
  { iconKey: 'coding_plain', text: 'Coding' },
]
</script>

<template>
  <div class="h-full w-full p-6 overflow-y-auto">
    <SidebarSection title="Contact">
      <div class="space-y-4">
        <div>
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
    <SidebarSection title="Hardskills">
      <div class="space-y-4">
        <div v-for="(items, subCategory) in hardSkills" :key="subCategory">
          <h4 class="text-sm font-semibold text-gray-600 mb-2">
            {{ subCategory }}
          </h4>
          <div class="space-y-2">
            <SidebarItem
              v-for="item in items"
              :key="item.text"
              :icon-key="item.iconKey"
              :text="item.text"
            />
          </div>
        </div>
      </div>
    </SidebarSection>
    <SidebarSection title="Softskills" :items="softSkills" />
    <SidebarSection title="Languages" :items="languages" />
    <SidebarSection title="Hobbies & Interests" :items="hobbies" />
  </div>
</template>

<style lang="css" scoped>

</style>
