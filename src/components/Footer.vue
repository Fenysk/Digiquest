<template>
    <footer v-if="screen === 'desktop'" class="
                    xl:px-64 lg:px-32 md:px-16 sm:px-8 px-4 ease-in-out duration-300
                ">
        <div class="branding">
            <img 
                class="logo"
                src="@/assets/logo/digiquest_white.png"
                alt="Logo de la plateforme"
            />
        </div>

        <div class="most-viewed">
            <h3 class="primary-white">Les ressources les plus vues</h3>
            <ul>
                <li class="primary-white no-style" v-for="resource in mostViewed" :key="resource.title">
                    <a class="link" :href="resource.link">{{ resource.title }}</a>
                    <ul>
                        <li class="primary-white" v-for="page in resource.pages" :key="page.title">
                            <a class="link" :href="page.link">{{ page.title }}</a>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>

        <div class="useful-links">
            <h3 class="primary-white">Liens utiles</h3>
            <ul>
                <li class="primary-white list-disc" v-for="link in usefulLinks" :key="link.title">
                    <a class="link" :href="link.link">{{ link.title }}</a>
                </li>
            </ul>
        </div>
    </footer>
</template>

<script>
export default {
    name: "Footer",

    data() {
        return {
            screen: "desktop",

            //fake data
            mostViewed: [
                {
                    title: "Ressource 1",
                    link: "/blog",
                    pages: [
                        {
                            title: "Page la plus vue",
                            link: "/blog/page1",
                        },
                        {
                            title: "Deuxième page populaire",
                            link: "/blog/page2",
                        },
                    ]
                },
                {
                    title: "Ressource 2",
                    link: "/blog",
                    pages: [
                        {
                            title: "Page la plus vue",
                            link: "/blog/page1",
                        },
                        {
                            title: "Deuxième page populaire",
                            link: "/blog/page2",
                        },
                    ]
                },
                {
                    title: "Ressource 3",
                    link: "/blog",
                    pages: [
                        {
                            title: "Page la plus vue",
                            link: "/blog/page1",
                        },
                        {
                            title: "Deuxième page populaire",
                            link: "/blog/page2",
                        },
                    ]
                }
            ],

            usefulLinks: [
                {
                    title: "Plan du site",
                    link: "/plan-du-site",
                },
                {
                    title: "Faire un don",
                    link: "/donnation",
                },
                {
                    title: "Mentions légales",
                    link: "/mentions-legales",
                },
                {
                    title: "Nous contacter",
                    link: "/contact",
                },
                {
                    title: "A propos",
                    link: "/a-propos",
                },
                {
                    title: "Nos partenaires",
                    link: "/partenaires",
                },
                {
                    title: "Besoin d'aide ?",
                    link: "/aide",
                },
            ]
        }
    },

    methods: {
        handleResize() {
            this.screen = window.innerWidth > 768 ? "desktop" : "mobile";
        }
    },

    mounted() {
        window.addEventListener("resize", this.handleResize);
        this.handleResize();
    },
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/variables.scss";

footer {
    display: flex;
    justify-content: space-between;
    align-items:flex-start;
    gap: 32px;

    background-color: $secondary-brown;
    min-height: 72px;

    padding-top: 42px;
    padding-bottom: 42px;

    .branding {
        
        .logo {
            width: 300px;
            height: 150px;
            object-fit: contain;
        }
    }

    .most-viewed, .useful-links {
        h3 {
            margin-bottom: 16px;
        }
    }

}
</style>