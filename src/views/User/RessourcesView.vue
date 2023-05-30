<template>
  <div id="blog" class="
    xl:px-64 lg:px-32 md:px-16 sm:px-8 px-4 ease-in-out duration-300 py-16
  ">
    <h1 class="text-center">Nos ressources</h1>
    <Breadcrumb />

    <p class="text-center mt-8">Retrouvez ici toutes nos ressources (documentations, professionnels partenaires, etc.)</p>

    <Pagination 
      :currentPage="currentPage" 
      :articlesPerPages="articlesPerPages" 
      :articleCount="articlesCount"
    />

    <ul class="articles-list">
      <li v-for="article in articles" :key="article.id">

        <Miniature :article="article" :type="'ressources'" />
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
// import { getArticles } from '@/api/Article/getArticles';
import data from '@/assets/data.json';

import Breadcrumb from "@/components/elements/Breadcrumb.vue";
import Button from "@/components/elements/Button.vue";
import Pagination from "@/components/elements/Pagination.vue";
import Miniature from "@/components/elements/Miniature.vue";

export default {
  name: "RessourcesView",
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

    getArticles() {
      this.articles = data.ressources.slice(this.currentPage * this.articlesPerPages - this.articlesPerPages, this.currentPage * this.articlesPerPages);
      this.articlesCount = data.length;
      console.log(this.articles);
    }
  },

  mounted() {
    // getArticles()
    //   .then((articles) => {
    //     this.articles = articles.reverse().slice(this.currentPage * this.articlesPerPages - this.articlesPerPages, this.currentPage * this.articlesPerPages);
    //     this.articlesCount = articles.length;
    //   })
    //   .catch((error) => {
    //     console.error('Erreur lors de la récupération des articles:', error);
    //   });
    this.getArticles()
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

article {
  img {
    width: 100%;
    aspect-ratio: 2/1;
    object-fit: cover;
    border-radius: 10px;
  }
}
</style>