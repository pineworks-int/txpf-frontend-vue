<script setup lang="ts">
// add logic here later
</script>

<template>
  <nav>
    <div>
      <!-- placeholder for the logo -->
      <span>LOGO</span>
    </div>
    <ul>
      <li>
        <!-- link to scroll to a section on the page -->
        <a href="#projects">Projects</a>
      </li>
      <li>
        <!-- link to navigate to a different page using Vue Router -->
        <router-link to="/about-me">
          About Me
        </router-link>
      </li>
    </ul>
    <div>
      <!-- placeholder for Auth -->
      <button>Sign In</button>
      <span>AVATAR</span>
    </div>
  </nav>
</template>

<style scoped>
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #f0f0f0;
}

ul {
  list-style: none;
  display: flex;
  gap: 1rem;
}
</style>
