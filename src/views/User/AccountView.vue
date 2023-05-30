<template>
    <div class="
    account-view
    xl:px-64 lg:px-32 md:px-16 sm:px-8 px-4 ease-in-out duration-300 py-16
    ">
        <h1 class="text-center">Bonjour {{ profile.firstName }} !</h1>

        <div class="avatar mt-20">
            <h2 class="text-center mt-8 mb-8">Personnalise ton avatar</h2>
            <div class="container flex flex-row wrap gap-32 mt-16">
                <div class="animals">
                    <p class="text-center mb-4">Choisis ton animal</p>

                    <div class="grille">
                        <article v-for="animal in animals" :key="animal" class="animal">
                            <p>{{ animal }}</p>
                        </article>
                    </div>
                </div>
                <div class="colors">
                    <p class="text-center mb-4">Choisis ta couleur</p>

                    <div class="grille">
                        <article v-for="color in colors" :key="color" class="color">
                            <p>{{ color }}</p>
                        </article>
                    </div>
                </div>
            </div>
            <Button :text="'Valider'" class="cursor-pointer" />
        </div>

        <div class="personal-informations mt-16">
            <h2 class="text-center">Informations personnelles</h2>

            <div class="inputs flex flex-col justify-center">
                <input type="text" placeholder="Prénom" class="mt-4" v-model="profile.firstName" />
                <input type="text" placeholder="Nom" class="mt-4" v-model="profile.lastName" />
                <input type="email" placeholder="Email" class="mt-4" v-model="profile.email" />
            </div>

            <div class="flex justify-center mt-4">
                <Button :text="'Mettre à jour'" class="cursor-pointer" />
            </div>
        </div>

        <Button secondary :text="'Se déconnecter'" class="cursor-pointer" @click="logout" />
    </div>
</template>

<script>
import { getProfile } from "@/api/User/getProfile";
import jwtDecode from "jwt-decode";

import Button from "@/components/elements/Button.vue";

export default {
    name: "AccountView",

    components: { Button },

    data() {
        return {
            profile: {},
            dateDeNaissance: '',

            animals: [
                "Hérisson",
                "Écureuil",
                "Renard",
                "Castor",
                "Colibri",
                "Kiwi",
                "Libellule",
                "Papillon",
                "Poisson",
                "Poisson-globe",
                "Loutre",
                "Tortue",
                "Lion",
                "Panda",
                "Singe",
                "Licorne",
            ],

            colors: [
                "Rouge",
                "Orange",
                "Jaune",
                "Vert clair",
                "Vert foncé",
                "Bleu clair",
                "Bleu foncé",
                "Violet",
                "Rose clair",
                "Rose foncé",
                "Marron clair",
                "Marron foncé",
                "Gris clair",
                "Gris foncé",
                "Noir",
                "Blanc",
            ],
        }
    },

    methods: {
        logout() {
            localStorage.removeItem('token');
            localStorage.removeItem('profileId');
            this.$router.push('/');
            this.$nextTick(() => {
                window.location.reload();
            });
        }
    },

    mounted() {
        if (localStorage.getItem('token') === null) {
            this.$router.push('/connexion');
        } else {
            const token = localStorage.getItem('token');
            const profileId = jwtDecode(token).userId;

            getProfile(profileId)
                .then((profile) => {
                    this.profile = profile;
                })
                .catch((error) => {
                    console.error('Erreur lors de la récupération du profil:', error);
                });
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/variables.scss";

input {
    text-align: center;
    padding: 12px 24px;
    min-width: 400px;
    margin: 10px;
    border-radius: 100px;
    font-size: 1.2rem;
    white-space: nowrap;
    color: $primary-brown;
    border: 1px solid $primary-brown;

    &::placeholder {
        color: $primary-brown;
        opacity: 0.5;
    }
}

.grille {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(4, 1fr);
    gap: 1rem;
}
</style>