<template>
    <div id="home">
        <section class="banner xl:px-96 lg:px-64 md:px-16 sm:px-8 px-4 ease-in-out duration-300 py-16">
            <div class="container">
                <Quizz />
            </div>
        </section>

        <section class="about xl:px-64 lg:px-32 md:px-16 sm:px-8 px-4 ease-in-out duration-300 py-16">
            <div class="content">
                <h2>Qui sommes-nous ?</h2>
                <p v-html="about_text"></p>
            </div>
            <img src="@/assets/photos/christina-wocintechchat-com-LQ1t-8Ms5PY-unsplash.jpg" alt="" />
        </section>

        <section class="facts">
            <div class="content xl:px-96 lg:px-64 md:px-32 sm:px-16 px-4 ease-in-out duration-300 py-16">
                <h2>{{ facts[randomFact] }}</h2>
            </div>
        </section>

        <section class="testimonies xl:px-96 lg:px-64 md:px-16 sm:px-8 px-4 ease-in-out duration-300 py-16">
            <h2 class="text-center">Témoignages</h2>
            <blockquote>
                <p class="text-center"><span class="quote-char">“</span>{{ testimonies[randomTestimonie].text }}<span
                        class="quote-char">„</span></p>
                <footer class="text-center mt-2">{{ testimonies[randomTestimonie].author }}</footer>
            </blockquote>
        </section>

        <section class="last_news xl:px-64 lg:px-32 md:px-16 sm:px-8 px-4 ease-in-out duration-300 py-16">
            <h2 class="text-center">Nos dernières actualités</h2>

            <div class="last_news_container">
                <article v-for="article in articles" :key="article.title">
                    <img :src="article.image" alt="" />
                    <h3 class="text-center my-4">{{ article.title }}</h3>
                    <p v-html="truncateHTML(article.content, 200)"></p>
                    <div class="flex justify-center">
                        <Button :text="'Lire l\'article'" :href="'/blog/article/' + article.id" secondary />
                    </div>
                </article>
            </div>
            <div class="flex justify-center mt-8">
                <Button :text="'Voir nos autres actualités'" :href="'/blog'" />
            </div>
        </section>
    </div>
</template>

<script>
import { getArticles } from "@/api/Article/getArticles";

import Quizz from "@/components/Quizz.vue";
import Button from "@/components/elements/Button.vue";
import data from "@/assets/data.json";

export default {
    name: "HomeView",
    components: { Quizz, Button },

    data() {
        return {
            about_text: data.about_text,
            facts: data.facts,
            randomFact: 0,
            testimonies: data.testimonies,
            randomTestimonie: 0,
            articles: [],
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
                this.articles = articles.slice(-6).reverse();
            })
            .catch((error) => {
                console.error('Erreur lors de la récupération des articles:', error);
            });
    },

    created() {
        this.randomTestimonie = Math.floor(Math.random() * this.testimonies.length);
        this.randomFact = Math.floor(Math.random() * this.facts.length);
    },

};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";

#home {
    background-color: $primary-white;
}

.banner {
    display: flex;
    justify-content: center;
    align-items: center;

    min-height: 60vh;

    background-image: url("@/assets/photos/markus-spiske-97Rpu-UmCaY-unsplash.jpg");
    background-size: cover;
    background-position: center;

    .container {
        padding: 32px;
        background-color: rgba($primary-white, 0.8);
        backdrop-filter: blur(5px);
        border-radius: 10px;
    }
}

.about {
    display: flex;
    justify-content: space-between;
    gap: 32px;

    img {
        width: 30vw;
        height: 100%;
        object-fit: cover;
        border-radius: 10px;
    }
}

.facts {
    display: flex;
    justify-content: center;
    align-items: center;

    background-image: url("../../assets/images/julia-maior-PjR6RRsJSRE-unsplash.jpg");
    background-size: cover;
    background-position: center;

    .content {
        backdrop-filter: blur(4px);
        height: 100%;
        width: 100%;

        h2 {
            line-height: 3rem;
            text-align: center;
            color: $primary-blue;
            white-space: break-spaces;
        }
    }
}

.testimonies {
    min-height: 20vh;

    blockquote {
        .quote-char {
            color: $primary-brown;
            font-size: 32px;
            padding: 0 8px;
        }

        p {
            font-style: italic;
        }

        footer {
            font-size: 20px;
            font-weight: bold;
            color: $primary-brown;
        }
    }
}

.last_news {
    background-color: $secondary-blue;
    overflow: hidden;

    &_container {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
        grid-gap: 20px;

        article {
            img {
                width: 100%;
                aspect-ratio: 2/1;
                object-fit: cover;
                border-radius: 10px;
            }
        }
    }
}

.mobile {
    article {
        img {
            height: 15vh;
        }
    }
}
</style>