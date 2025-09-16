<script setup lang="ts">
import { computed, ref } from 'vue'
import Icon from '@/components/ui/Icon.vue'
import { useToastStore } from '@/stores/toast'

const props = defineProps<{
  iconKey: string
  text: string
  href?: string
  textToCopy?: string
}>()

const copied = ref(false)
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
    class="flex items-center space-x-3 cursor-pointer group transition-colors"
  >
    <span class="text-2xl filter grayscale group-hover:grayscale-0 transition duration-300 ease-in-out">
      <Icon :name="iconKey" size="lg" />
    </span>
    <span class="text-md text-gray-700 group-hover:text-blue-500">
      {{ text }}
    </span>
  </a>

  <button
    v-else-if="textToCopy"
    class="flex items-center space-x-3 text-left w-full group transition-colors"
    @click="handleCopyToClipboard"
  >
    <span class="text-xl filter grayscale group-hover:grayscale-0 transition duration-300 ease-in-out">
      <Icon :name="iconKey" size="lg" />
    </span>
    <span class="text-md text-gray-700 group-hover:text-blue-500">
      {{ text }}
    </span>
  </button>

  <div v-else class="flex items-center space-x-3 group">
    <span class="text-xl filter grayscale group-hover:grayscale-0 transition duration-300 ease-in-out">
      <Icon :name="iconKey" size="lg" />
    </span>
    <span class="text-md text-gray-700 group-hover:text-blue-500">
      {{ text }}
    </span>
  </div>
</template>
