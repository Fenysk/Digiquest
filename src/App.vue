<template>
  <div :class="screenType">
    <Header :screen=screenType ></Header>
    <router-view class="mt-16" />
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

export default {
  name: 'App',
  components: { Header, Footer },

  data() {
    return {
      screenType: "mobile",
    };
  },

  methods: {
    handleResize() {
      if (window.innerWidth > 1024) {
        this.screenType = "desktop";
      } else if (window.innerWidth > 768) {
        this.screenType = "tablet";
      } else {
        this.screenType = "mobile";
      }
    },
  },

  mounted() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  },

}
</script>

<style lang="scss">
@import "./assets/scss/variables.scss";

* {
  scroll-behavior: smooth;
}
</style>