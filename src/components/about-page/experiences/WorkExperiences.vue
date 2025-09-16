<script setup lang="ts">
const experiences = [
  {
    title: 'Senior Frontend Developer',
    company: 'Tech Solutions Inc.',
    dates: 'Jan 2020 - Present',
    location: 'San Francisco, CA',
    achievements: [
      'Led the development of a new component library in Vue.js, improving development speed by 30%.',
      'Mentored junior developers and conducted code reviews to maintain code quality.',
      'Collaborated with UI/UX designers to implement pixel-perfect, responsive designs.',
    ],
  },
  {
    title: 'Web Developer',
    company: 'Creative Agency LLC',
    dates: 'Jun 2017 - Dec 2019',
    location: 'New York, NY',
    achievements: [
      'Developed and maintained client websites using JavaScript, HTML, and CSS.',
      'Worked with a team to launch over 20 successful project websites.',
      'Integrated third-party APIs for e-commerce and social media functionalities.',
    ],
  },
]
</script>

<template>
  <section id="work-experiences" class="p-8 bg-white rounded-lg shadow-md">
    <h2 class="text-2xl font-bold text-gray-800 mb-6">
      Work Experience - The Proof
    </h2>

    <div class="space-y-8">
      <article v-for="job in experiences" :key="job.title" class="relative pl-8">
        <div class="absolute left-3 top-2 h-full w-px bg-gray-200" />
        <div class="absolute left-[7px] top-2 w-3 h-3 bg-purple-500 rounded-full border-2 border-white" />

        <header>
          <h3 class="text-xl font-semibold text-gray-900">
            {{ job.title }}
          </h3>
          <p class="text-md font-medium text-purple-700">
            {{ job.company }}
          </p>
        </header>

        <div class="text-sm text-gray-500 my-1">
          <span>{{ job.dates }}</span> | <span>{{ job.location }}</span>
        </div>

        <ul class="list-disc list-inside text-gray-600 space-y-1 mt-2">
          <li v-for="achievement in job.achievements" :key="achievement">
            {{ achievement }}
          </li>
        </ul>
      </article>
    </div>
  </section>
</template>

<style scoped>
</style>
