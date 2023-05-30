<template>
    <header v-if="screen === 'desktop'" class="
                    xl:px-64 lg:px-32 md:px-16 sm:px-8 px-4 ease-in-out duration-300
                    ">

        <nav class="flex">
            <a href="/" class="branding" >
                <img class="logo" src="@/assets/logo/digiquest_blue.svg" alt="Logo DigiQuest">
            </a>

            <ul class="flex menu menu--primary">
                <li>
                    <MenuButton type="home" link="/" />
                </li>
                <li>
                    <MenuButton type="test" link="/test" />
                </li>
                <li>
                    <MenuButton type="ressources" link="/ressources" />
                </li>
                <li>
                    <MenuButton type="blog" link="/blog" />
                </li>
                <li>
                    <MenuButton type="contact" link="/contact-us" />
                </li>
            </ul>

            <ul class="flex menu menu--secondary">
                <li>
                    <MenuButton v-if="isConnected" type="account" link="/my-account" />
                    <MenuButton v-else type="connexion" link="/connexion" />
                </li>
                <li>
                    <MenuButton type="search" link="/search" />
                </li>
            </ul>
        </nav>
    </header>

    <header v-else class="
                    xl:px-64 lg:px-32 md:px-16 sm:px-8 px-4 ease-in-out duration-300
                    ">
        <nav class="flex">
            <a href="/" class="branding">
                <img class="logo" src="@/assets/logo/digiquest_blue.svg" alt="Logo DigiQuest">
            </a>

            <div class="burger">

            </div>
        </nav>
    </header>
</template>

<script>
import MenuButton from './elements/MenuButton.vue';

export default {
    name: "Header",
    components: { MenuButton },

    props: {
        screen: {
            type: String,
            default: "desktop"
        },
    },

    computed: {
        isConnected() {
            return localStorage.getItem("token") ? true : false;
        }
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";

header {
    position: fixed;
    top: 0;
    left: 0;

    background-color: $primary-white;
    box-shadow: 0 2px 4px rgba($primary-blue, 0.4);
    width: 100%;
    height: 70px;
    z-index: 1000;

    display: flex;
    flex-flow: row nowrap;

    .branding {
        height: 70%;
    }

    nav {
        width: 100%;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
    }

    ul,
    li {
        list-style-type: none;
        margin: 0;
    }

    .logo {
        width: 100%;
        height: 100%;
        max-height: 100px;
        object-fit: contain;
    }
}
</style>