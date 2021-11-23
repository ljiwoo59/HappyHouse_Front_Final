<template>
  <div id="app">
    <div :class="{ 'nav-open': NavbarStore.showNavbar }">
      <router-view name="header" />
      <router-view />
      <!-- <router-view name="footer" /> -->
    </div>
  </div>
</template>

<script>
</script>

<style>
</style>
