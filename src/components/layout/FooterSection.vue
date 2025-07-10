<script setup lang="ts">
</script>

<template>
  <footer class="site-footer">
    <div class="toggles">
      <!-- placeholder for dark/light mode toggle -->
      <button>Mode Toggle</button>
      <!-- placeholder for language switch -->
      <button>EN/FR</button>
    </div>
    <div class="links">
      <!-- social or legal links here -->
      <p>&copy; {{ new Date().getFullYear() }} T∋hx @ PineWorks Int. All Rights Reserved.</p>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  background-color: #333;
  /* temporary */
  color: white;
}
</style>
