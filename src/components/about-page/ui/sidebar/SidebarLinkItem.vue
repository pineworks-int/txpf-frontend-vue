<script setup lang="ts">
import { computed, ref } from 'vue'
import { getTechLogo } from '@/lib/tech-logos'
import { useToastStore } from '@/stores/toast'

const props = defineProps<{
  iconKey: string
  text: string
  href?: string
  textToCopy?: string
}>()

const copied = ref(false)
const icon = computed(() => getTechLogo(props.iconKey))
const isExternalLink = computed(() => props.href?.startsWith('http'))

const toastStore = useToastStore()

function handleCopyToClipboard() {
  if (!props.textToCopy)
    return

  navigator.clipboard.writeText(props.textToCopy).then(() => {
    copied.value = true
    toastStore.showSuccess('Copied to clipboard !')
    setTimeout(() => {
      copied.value = false
    }, 2000)
  })
}
</script>

<template>
  <a
    v-if="href"
    :href="href"
    :target="isExternalLink ? '_blank' : undefined"
    :rel="isExternalLink ? 'noopener noreferrer' : undefined"
    class="flex items-center space-x-3 cursor-pointer group transition-colors mb-2"
  >
    <span class="text-lg text-gray-500" v-html="icon" />
    <span class="text-md text-gray-700 group-hover:text-blue-500">{{ text }}</span>
  </a>

  <button
    v-else-if="textToCopy"
    class="flex items-center space-x-3 text-left w-full group transition-colors mb-2"
    @click="handleCopyToClipboard"
  >
    <span class="text-lg text-gray-500" v-html="icon" />
    <span class="text-md text-gray-700 group-hover:text-blue-500">{{ text }}</span>
  </button>

  <div v-else class="flex items-center space-x-3 mb-2 group">
    <span class="text-lg text-gray-500" v-html="icon" />
    <span class="text-md text-gray-700 group-hover:text-blue-500">{{ text }}</span>
  </div>
</template>
