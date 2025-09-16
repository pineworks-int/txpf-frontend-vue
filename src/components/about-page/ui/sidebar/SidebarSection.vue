<script setup lang="ts">
import SidebarItem from '@/components/about-page/ui/sidebar/SidebarItem.vue'
import SidebarTitle from '@/components/about-page/ui/sidebar/SidebarTitle.vue'

interface Item {
  iconKey: string
  text: string
}

defineProps<{
  title: string
  items?: Item[]
}>()
</script>

<template>
  <div class="mb-6">
    <SidebarTitle :title="title" />
    <div v-if="items" class="space-y-2">
      <SidebarItem
        v-for="item in items"
        :key="item.text"
        :icon-key="item.iconKey"
        :text="item.text"
      />
    </div>
    <slot v-else />
  </div>
</template>
