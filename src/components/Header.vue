<template>
    <header class="
                    xl:px-64 lg:px-32 md:px-16 sm:px-8 px-4 ease-in-out duration-300
                    ">

        <nav class="flex">
            <a href="/" class="branding">
                <img class="logo" src="@/assets/logo/digiquest_blue.svg" alt="Logo DigiQuest">
            </a>

            <ul class="flex menu menu--primary menu--desktop">
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
                <!-- <li>
                    <MenuButton type="search" link="/search" />
                </li> -->
            </ul>

            <ul class="flex menu menu--secondary menu--desktop">
                <li>
                    <MenuButton v-if="isConnected" type="account" link="/my-account" />
                    <MenuButton v-else type="connexion" link="/connexion" />
                    <a href="" class="animal cursor-pointer">
                        <!-- <img :src="require(`@/assets/picto/animals/${account.avatarAnimal}.svg`)" :alt="animal" /> -->
                    </a>
                </li>
                <li>
                    <MenuButton type="contact" link="/contact-us" />
                </li>
            </ul>

            <div class="burger" @click="toggleMenu">
                <span></span>
                <span></span>
                <span></span>
            </div>

            <ul class="flex menu menu--mobile" v-if="isMenuOpen">
                <li>
                    <MenuButton type="home" link="/" :mode="'mobile'" @click="toggleMenu" />
                </li>
                <li>
                    <MenuButton type="test" link="/test" :mode="'mobile'" @click="toggleMenu" />
                </li>
                <li>
                    <MenuButton type="ressources" link="/ressources" :mode="'mobile'" @click="toggleMenu" />
                </li>
                <li>
                    <MenuButton type="blog" link="/blog" :mode="'mobile'" @click="toggleMenu" />
                </li>
                <li>
                    <MenuButton type="search" link="/search" :mode="'mobile'" @click="toggleMenu" />
                </li>
                <li>
                    <MenuButton v-if="isConnected" type="account" link="/my-account" :mode="'mobile'" @click="toggleMenu" />
                    <MenuButton v-else type="connexion" link="/connexion" :mode="'mobile'" @click="toggleMenu" />
                </li>
                <li>
                    <MenuButton type="contact" link="/contact-us" :mode="'mobile'" @click="toggleMenu" />
                </li>
            </ul>
        </nav>
    </header>
</template>

<script>
import MenuButton from './elements/MenuButton.vue';
import { getUser } from "@/api/User/getUser";

export default {
    name: "Header",
    components: { MenuButton },

    data() {
        return {
            isMenuOpen: false,
            account: {
                avatarAnimal: "cat",
                avatarColor: "blue",
            },
        }
    },

    methods: {
        toggleMenu() {
            this.isMenuOpen = !this.isMenuOpen;
        },
    },

    computed: {
        isConnected() {
            return localStorage.getItem("token") ? true : false;
        }
    },

    async mounted() {
        if (this.isConnected) {
            try {
                const result = await getUser(profileId);
                this.account = result;

            } catch (error) {
                console.error("Erreur lors de la récupération du profil:", error);
            }
        }
    }
}
</script>

<style lang="scss">
@import "@/assets/scss/variables.scss";

header {
    position: fixed;
    top: 0;
    left: 0;

    background-color: $primary-white;
    box-shadow: 0 2px 4px rgba($primary-blue, 0.4);
    width: 100vw;
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

    .burger {
        display: none;
    }

    .menu {
        &--mobile {
            display: none;
        }
    }
}

.mobile {
    header {
        .burger {
            display: flex;
            flex-flow: column nowrap;
            justify-content: space-between;
            align-items: center;
            width: 30px;
            height: 30px;
            margin-right: 10px;
            cursor: pointer;

            span {
                width: 100%;
                height: 3px;
                background-color: $primary-blue;
                border-radius: 2px;
            }
        }

        .menu {
            &--desktop {
                display: none;
            }

            &--mobile {
                display: flex;
                flex-flow: column nowrap;
                justify-content: center;
                align-items: center;
                width: 100vw;
                position: fixed;
                top: 70px;
                left: 0;
                background-color: $primary-white;
                z-index: 999;
                padding: 20px 0;

                li {
                    margin: 10px 0;
                    width: 100%;
                    padding-left: 32px;
                }
            }
        }
    }
}
</style>