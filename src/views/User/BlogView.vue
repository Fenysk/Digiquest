<template>
  <div id="blog" class="
    xl:px-64 lg:px-32 md:px-16 sm:px-8 px-4 ease-in-out duration-300 py-16
  ">
    <h1 class="text-center">Nos articles</h1>
    <Breadcrumb />

    <Pagination 
      :currentPage="currentPage" 
      :articlesPerPages="articlesPerPages" 
      :articleCount="articlesCount"
    />

    <ul class="articles-list">
      <li v-for="article in articles" :key="article.id">

        <Miniature :article="article" />
      </li>
    </ul>

    <Pagination 
      :currentPage="currentPage" 
      :articlesPerPages="articlesPerPages" 
      :articleCount="articlesCount"
    />

  </div>
</template>

<script>
import { getArticles } from '@/api/Article/getArticles';

import Breadcrumb from "@/components/elements/Breadcrumb.vue";
import Button from "@/components/elements/Button.vue";
import Pagination from "@/components/elements/Pagination.vue";
import Miniature from "@/components/elements/Miniature.vue";

export default {
  name: "BlogView",
  components: {
    Breadcrumb,
    Pagination,
    Button,
    Miniature,
  },

  data() {
    return {
      articles: [],
      currentPage: this.$route.params.page || 1,
      articlesPerPages: 4,
      articlesCount: 0,
    }
  },

  methods: {
    truncateHTML(html, length) {
      if (html.length <= length) {
        return html;
      } else {
        return html.substring(0, length) + '...';
      }
    },
  },

  mounted() {
    getArticles()
      .then((articles) => {
        this.articles = articles.reverse().slice(this.currentPage * this.articlesPerPages - this.articlesPerPages, this.currentPage * this.articlesPerPages);
        this.articlesCount = articles.length;
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des articles:', error);
      });
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";

.articles-list {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 2rem;
  margin-top: 2rem;
}
</style>