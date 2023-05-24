<template>
  <div :class="screenType">
    <Header :screen=screenType :isConnected="isConnected"></Header>
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
      this.screenType = window.innerWidth > 838 ? "desktop" : "mobile";
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