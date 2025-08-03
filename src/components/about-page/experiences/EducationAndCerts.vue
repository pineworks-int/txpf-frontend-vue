<script setup lang="ts">
import { getIcon } from '@/lib/icons'

// Placeholder data for your education.
const education = [
  {
    degree: 'Self-Taught & Online Courses',
    institution: 'Various Platforms (Coursera, Udemy, FreeCodeCamp)',
    dates: '2021 - Present',
    details: 'Focused on modern web development, data structures, algorithms, and software architecture.',
  },
  // {
  //   degree: 'High School Diploma',
  //   institution: 'Your High School Name',
  //   dates: 'Year of Graduation',
  //   details: 'Relevant coursework or achievements.'
  // }
]

const certifications = [
  {
    name: 'Vue.js 3: The Composition API',
    issuer: 'Vue Mastery',
    date: '2023',
    credentialUrl: '#',
  },
  {
    name: 'Responsive Web Design',
    issuer: 'freeCodeCamp',
    date: '2022',
    credentialUrl: '#',
  },
]
</script>

<template>
  <section id="education-and-certs" class="p-8 bg-white rounded-lg shadow-md">
    <h2 class="text-2xl font-bold text-gray-800 mb-6">
      Education & Certifications - The Foundation
    </h2>

    <div class="space-y-8">
      <!-- => education subsection -->
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">
          Education
        </h3>
        <div class="space-y-4">
          <!-- We loop through the education array. -->
          <article v-for="edu in education" :key="edu.degree">
            <h4 class="text-lg font-semibold text-gray-900">
              {{ edu.degree }}
            </h4>
            <p class="text-md font-medium text-purple-700">
              {{ edu.institution }}
            </p>
            <p class="text-sm text-gray-500 my-1">
              {{ edu.dates }}
            </p>
            <p class="text-gray-600">
              {{ edu.details }}
            </p>
          </article>
        </div>
      </div>

      <!-- => certifications subsection -->
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">
          Certifications
        </h3>
        <div class="space-y-4">
          <article v-for="cert in certifications" :key="cert.name">
            <h4 class="text-lg font-semibold text-gray-900">
              {{ cert.name }}
            </h4>
            <div class="flex items-center justify-between">
              <p class="text-md font-medium text-purple-700">
                {{ cert.issuer }} - {{ cert.date }}
              </p>
              <a
                v-if="cert.credentialUrl"
                :href="cert.credentialUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center text-sm text-blue-600 hover:underline"
              >
                View Credential
                <span class="w-4 h-4 ml-1" v-html="getIcon('a_external_link')" />
              </a>
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
</style>
