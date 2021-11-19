<template>
  <div>
      <b-table borderless hover :items="words" :fields="fields" head-variant="light"></b-table>
  </div>
</template>

<script>
import { mapState } from "vuex";

const wordStore = "wordStore";

export default {
    computed: {
        ...mapState(wordStore, ["words"])
    },
    data() {
        return {
            fields: [{
                key: "word",
                label: "인기 검색어"
            }]
        }
    }
}

</script>

<style>

</style>