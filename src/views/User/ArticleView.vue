<template>
    <div id="article" class="pt-16">
        <h1 class="text-center">{{ article.title }}</h1>
        <Breadcrumb :last="article.title" />

        <article
            class="mt-4 xl:px-64 lg:px-32 md:px-16 sm:px-8 px-4 ease-in-out duration-300"
        >
            <img :src="article.image" :alt="article.title" />
            <div class="mt-4 article-content" v-html="article.content" />
        </article>

        <div class="flex justify-center mt-8">
            <Button :text="'Retour à la liste des articles'" :href="'/blog'" />
            <Button
                :text="'Aller en haut de la page'"
                :href="'#article'"
                secondary
            />
        </div>

        <Comments
            class="xl:px-64 lg:px-32 md:px-16 sm:px-8 px-4 ease-in-out duration-300"
            :articleId="article.id"
        />
    </div>
</template>

<script>
import { getArticle } from "@/api/Article/getArticle";

import Breadcrumb from "@/components/elements/Breadcrumb.vue";
import Button from "@/components/elements/Button.vue";
import Comments from "@/components/elements/Comments.vue";

export default {
    name: "ArticleView",
    components: { Breadcrumb, Button, Comments },

    data() {
        return {
            article: {},
        };
    },

    async mounted() {
        const articleId = this.$route.params.id;
        getArticle(articleId)
            .then((article) => {
                this.article = article;
            })
            .catch((error) => {
                console.error(
                    "Erreur lors de la récupération des articles:",
                    error
                );
            });
    },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";

#article {
    background-color: $primary-white;

    img {
        width: 100%;
        aspect-ratio: 2/1;
        object-fit: cover;
        object-position: center;
        border-radius: 10px;
        max-height: 40vh;
    }
}
</style>

<style lang="scss">
@import "@/assets/scss/variables.scss";

h1 {
    width: 70%;
    margin: auto;
    white-space: pre-wrap !important;
    line-height: 1.2 !important;
}

.article-content {
    h3 {
        margin-top: 32px !important;
        margin-bottom: 16px !important;
    }

    ul {
        li {
            list-style-type: disc;
            margin-left: 20px;
        }
    }

    p {
        margin-bottom: 16px !important;
    }

    a {
        color: $secondary-green;
        text-decoration: underline;
    }
}
</style>