<template>
    <div
        id="sitemap"
        class="xl:px-64 lg:px-32 md:px-16 sm:px-8 px-4 ease-in-out duration-300 py-64"
    >
        <h1 class="text-center">Plan du site</h1>

        <ul>
            <li v-for="page in sitemap" :key="page.name">
                <a :class="'link'" :href="page.link">{{ page.name }}</a>
                <ul v-if="page.children && page.children.length">
                    <li v-for="child in page.children" :key="child.name">
                        <a :class="'link'" :href="child.link">{{ child.name }}</a>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "TestView",

    data() {
        return {
            sitemap: [
                {
                    name: "Accueil",
                    link: "/",
                    children: [],
                },
                {
                    name: "Faire un pré-diagnostic",
                    link: "/test",
                    children: [],
                },
                {
                    name: "Ressources utiles",
                    link: "/ressources",
                    children: [
                        {
                            name: "Professionnels",
                            link: "/ressources/professionnals/:id",
                        },
                    ],
                },
                {
                    name: "Notre blog",
                    link: "/blog",
                    children: [],
                },
                {
                    name: "AccountView",
                    link: "/my-account",
                    children: [],
                },
                {
                    name: "ContactView",
                    link: "/contact-us",
                    children: [],
                },
                {
                    name: "SitemapView",
                    link: "/legal",
                    children: [],
                },
                {
                    name: "SiteMapView",
                    link: "/plan-du-site",
                    children: [],
                },
            ],
        }
    },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";

// style qui prend de la place sur la page
#sitemap {
    ul {
        list-style-type: none;
        padding-left: 0;

        li {
            margin-bottom: 2rem;

            a {
                color: $primary-brown;
                transition: color 0.3s ease-in-out;

                &:hover {
                    color: $primary-yellow;
                }
            }

            ul {
                margin-top: 1rem;
                margin-left: 2rem;
            }
        }
    }
}
</style>