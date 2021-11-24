<template>
  <footer
    class="footer"
    :class="{ [`footer-${type}`]: type }"
    :data-background-color="backgroundColor"
  >
    <div class="container">
      <nav>
        <ul>
          <li>
            <router-link :to="{ name: 'Main' }" class="link"> HappyHouse </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'NewsList' }" class="link"> News </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'QnaList' }" class="link"> HELP </router-link>
          </li>
        </ul>
      </nav>
      <div class="copyright">
        &copy; {{ year }}, made by Ji Woo Lee, Dain Kim.
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  props: {
    backgroundColor: String,
    type: String,
  },
  data() {
    return {
      year: '2021',
    };
  },
};
</script>
<style></style>
