<template>
  <div id="blog">
    <h1>Blog</h1>
    <Breadcrumb />


  </div>
</template>

<script>
import data from "../../assets/data.json";

import Breadcrumb from "../../components/elements/Breadcrumb.vue";
import Button from "../../components/elements/Button.vue";

export default {
  name: "BlogView",
  components: {
    Breadcrumb,
    Button,
  },

  data() {
    return {
      articles: data.articles,
    }
  },
}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/variables.scss";

</style>