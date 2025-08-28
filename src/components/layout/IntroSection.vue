<script setup lang="ts">

</script>

<template>
  <div class="max-w-4xl mx-auto p-6 space-y-8 bg-surface-1 rounded-lg">
    <!-- ~ Intro Section ~ -->
    <section class="text-center space-y-4">
      <h1 class="text-xl md:text-2xl italic text-primary-medium mb-4 font-oxanium">
        Et si on se rencontrait ?
      </h1>
      <p class="text-content/90 leading-relaxed text-base mb-2 md:text-lg font-montserrat">
        Dans un monde où les technologies informatiques se développent à un rythme effréné, où
        l'intelligence artificielle intègre progressivement nos routines quotidiennes,
        la force de l'Homme, elle, reside toujours dans notre capacité à nous rencontrer,
        à nouer des liens et à échanger de manière fluide.
      </p>
      <p class="text-content/90 leading-relaxed text-base md:text-lg italic font-montserrat">
        "... Et si on se rencontrait ?"
      </p>
    </section>

    <!-- ~ Separator ~ -->
    <div class="flex justify-center items-center py-6">
      <div class="w-32 h-px bg-gradient-to-r from-transparent via-primary-medium to-transparent glow-primary-sm" />
    </div>

    <!-- ~ Personal Introduction Section ~ -->
    <section class="space-y-6">
      <!-- Title -->
      <h1 class="text-2xl md:text-3xl font-bold text-primary-medium mb-4 text-center lg:text-left font-oxanium">
        Bonjour, Bienvenue, et Enchanté
      </h1>

      <!-- ~ Photo placeholder for mobile ~ -->
      <div class="flex justify-center lg:hidden mb-6">
        <div class="relative p-1 rounded-lg bg-gradient-to-br from-primary-subtle to-primary-muted shadow-lg shadow-primary/20">
          <div class="w-44 h-60 bg-surface-2 rounded-md flex items-center justify-center relative overflow-hidden border border-primary-subtle/50">
            <span class="text-primary-subtle text-lg font-medium font-oxanium">Photo</span>
          </div>
        </div>
      </div>

      <!-- ~ Content Grid ~ -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div class="lg:col-span-2 space-y-4">
          <p class="text-content/90 leading-relaxed mb-4 text-base md:text-lg font-montserrat">
            Je m'appelle Thibault, et je suis développeur web. <br>
            <br>
            Non pas par mode, ou par envie d'être en concurence avec des millions d'autres,
            mais parce que <span class="font-bold">j'aime ça</span>. <br>
            <br>
            Je suis passionné par le web et j'y ai consacré l'entiereté de ma carrière, à peu de
            choses près. <br>
            <br>
            Aujourd'hui, je travaille principalement avec <span class="font-bold">TypeScript</span>,
            <span class="font-bold">Vue.js/Nuxt</span>, <span class="font-bold">Tailwind CSS</span>,
            et <span class="font-bold">PostgreSQL</span>.
          </p>
          <p class="text-content/90 leading-relaxed mb-4 text-base md:text-lg font-montserrat">
            Si cela vous plaît, vous pouvez librement consulter et/ou télécharger mon CV sur la page
            <a href="/about-me" class="text-primary underline italic">"A propos de moi"</a>
          </p>
          <div class="mt-6 space-y-1">
            <p class="text-content/90 leading-relaxed mb-4 text-base md:text-lg font-montserrat">
              Gardez la pêche, <span class="font-bold">gardons le contact</span> !
            </p>
            <p class="text-content/90 leading-relaxed mb-4 text-base md:text-lg font-montserrat">
              Bien à vous,
            </p>
            <p class="text-content/90 leading-relaxed mb-4 text-base md:text-lg font-medium font-montserrat">
              Thibault
            </p>
          </div>
        </div>

        <!-- ~ Photo Placeholder for desktop ~ -->
        <div class="hidden lg:flex justify-end">
          <div class="relative p-1 rounded-lg bg-gradient-to-br from-primary-subtle to-primary-muted shadow-lg shadow-primary/20">
            <div class="w-44 h-60 bg-surface-2 rounded-md flex items-center justify-center relative overflow-hidden border border-primary-subtle/50">
              <span class="text-primary-subtle text-lg font-medium font-oxanium">Photo</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ~ Separator ~ -->
    <div class="flex justify-center items-center py-6">
      <div class="w-32 h-px bg-gradient-to-r from-transparent via-primary-medium to-transparent glow-primary-sm" />
    </div>
  </div>
</template>
