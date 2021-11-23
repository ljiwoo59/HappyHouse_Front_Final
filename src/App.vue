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
  .pagination {
    /* position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX( -50% ); */
    justify-content: center;
  }

</style>
