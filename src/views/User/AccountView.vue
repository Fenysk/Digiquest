<template>
    <div class="account-view xl:px-64 lg:px-32 md:px-16 sm:px-8 px-4 ease-in-out duration-300 py-16">
        <h1 class="text-center">Bonjour {{ account.profile.firstName }} !</h1>

        <div class="avatar mt-20">
            <h2 class="text-center mt-8 mb-8">Personnalise ton avatar</h2>
            <div class="container flex flex-row wrap gap-32 mt-16">
                <div class="animals">
                    <p class="text-center mb-4">Choisis ton animal</p>

                    <div class="grille">
                        <div v-for="animal, index in animals" :key="index" class="flex flex-col">
                            <a  @click.prevent="selectAnimal(animal)" href="" class="animal cursor-pointer" :class="{'selected' : account.avatarAnimal === animal}" >
                                <img :src="require(`@/assets/picto/animals/${animal}.svg`)" :alt="animal" />
                            </a>
                            <span class="text-center">{{ animalLabels[animal] }}</span>
                        </div>
                        
                    </div>
                </div>
                <div class="colors">
                    <p class="text-center mb-4">Choisis ta couleur</p>

                    <div class="grille">
                        <article v-for="color in colors" :key="color"
                            class="color rounded-full cursor-pointer p-1 border-2 border-black" :class="{'selected' : account.avatarColor === color}">
                            <div :class="color" class="h-12 w-12 rounded-full" @click="selectColor(color)">
                            </div>
                        </article>
                    </div>
                </div>
            </div>
        </div>

        <div class="personal-informations mt-16">
            <h2 class="text-center">Informations personnelles</h2>

            <div class="inputs flex flex-col justify-center">
                <input type="text" placeholder="Prénom" class="mt-4" v-model="account.profile.firstName" />
                <input type="text" placeholder="Nom" class="mt-4" v-model="account.profile.lastName" />
                <input type="birthday" placeholder="Date de naissance" class="mt-4" v-model="birthDateToDisplay" />
            </div>

            <div class="flex justify-center mt-4">
                <Button :text="'Mettre à jour'" class="cursor-pointer" @click="updateProfile" />
            </div>
        </div>

        <Button :text="'Se déconnecter'" class="cursor-pointer" @click="logout" />
        <Button secondary :text="'Supprimer mon compte'" class="cursor-pointer" @click="deleteAccount" />
        <Button secondary :text="'Nouvel article'" class="cursor-pointer float-right" @click="$router.push('/blog/new')" v-if="isAdmin" />
    </div>
</template>

<script>

import { getIsAdmin } from "@/api/Auth/getIsAdmin";
import { getIsRedactor } from "@/api/Auth/getIsRedactor";
import { getUser } from "@/api/User/getUser";
import { patchUser } from "@/api/User/patchUser";
import { deleteProfile } from "@/api/User/deleteProfile";
import jwtDecode from "jwt-decode";

import Button from "@/components/elements/Button.vue";

export default {
    name: "AccountView",

    components: { Button },

    data() {
        return {
            isAdmin: false,
            account: {
              avatarAnimal: null,
              avatarColor: null,
              profile: {
              },
            },
            profile: {},
            birthDateToDisplay: "",
            animalLabels: {
              hedgehog: "Hérisson",
              squirrel: "Ecureuil",
              fox: "Renard",
              beaver: "Castor",
              hummingbird: "Colibri",
              kiwi: "Kiwi",
              dragonfly: "Libellule",
              butterfly: "Papillon",
              fish: "Poisson",
              pufferfish: "Poisson-Lune",
              otter: "Loutre",
              turtle: "Tortue",
              lion: "Lion",
              panda: "Panda",
              monkey: "Singe",
              unicorn: "Licorne"
            },

            animals: [
                "hedgehog",
                "squirrel",
                "fox",
                "beaver",
                "hummingbird",
                "kiwi",
                "dragonfly",
                "butterfly",
                "fish",
                "pufferfish",
                "otter",
                "turtle",
                "lion",
                "panda",
                "monkey",
                "unicorn",
            ],

            colors: [
                "red",
                "orange",
                "yellow",
                "green",
                "blue",
                "purple",
                "pink",
                "brown",
                "black",
                "white",
                "grey",
                "beige",
                "turquoise",
                "gold",
                "silver",
                "bronze",
            ],
        };
    },

    methods: {
        async checkIfAdmin() {
            try {
              this.isAdmin = await getIsAdmin();

            } catch (error) {
              
            }
            /*
            if (this.isAdmin !== "OK") {
                this.isAdmin = await getIsRedactor();
            }
            */
        },

        logout() {
            localStorage.removeItem("token");
            localStorage.removeItem("profileId");
            this.$router.push("/");
            this.$nextTick(() => {
                window.location.reload();
            });
        },

        selectAnimal(animal) {
          this.account.avatarAnimal = animal;
        },
        selectColor(color) {
          this.account.avatarColor = color;
        },

        async updateProfile() {
            const date = new Date(this.birthDateToDisplay);

            if (isNaN(date.getTime())) {
                console.error('Invalid date format');
                return;
            }

            // compensate for -1 hour offset by new Date() -> toISOString
            date.setHours(date.getHours() + 1);

            const isoDate = date.toISOString();

            this.account.profile.birthDate = isoDate;

           
           try {
             const token = localStorage.getItem("token");
             const profileId = jwtDecode(token).userId;
             await patchUser(profileId, this.account);
             location.reload();
           } catch (error) {
              console.error('Erreur lors de la mise à jour du profil:', error);
           }
        },

        deleteAccount() {
            deleteProfile(this.account.id)
                .then(() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("profileId");
                    
                    this.$nextTick(() => {
                      window.location.reload();
                      this.$router.push("/");
                    });
                    
                   location.replace("/");
                })
                .catch((error) => {
                    console.error('Erreur lors de la suppression du profil:', error);
                });
        }

    },

    watch: {
        birthDateToDisplay() {
            // ISO to FR with good practice
            const date = new Date(this.birthDateToDisplay);
            const options = { year: "numeric", month: "long", day: "numeric" };
            this.birthDateToDisplay = date.toLocaleDateString("fr-FR", options);
        },
    },

    async mounted() {
        console.log('mount')
        await this.checkIfAdmin();

        if (localStorage.getItem("token") === null) {
            this.$router.push("/connexion");
        } else {
            const token = localStorage.getItem("token");
            const profileId = jwtDecode(token).userId;
          try {
            const result = await getUser(profileId);
            this.account = result;
            this.birthDateToDisplay = this.account.profile.birthDate;

          } catch (error) {
            console.error("Erreur lors de la récupération du profil:", error); 
           }

        }
    },
};
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

.colors {
    .grille {
        .red {
            background-color: #bf1212;
        }

        .orange {
            background-color: #ff7f00;
        }

        .yellow {
            background-color: rgb(255, 242, 0);
        }

        .green {
            background-color: #13d413;
        }

        .blue {
            background-color: #1111d8;
        }

        .purple {
            background-color: #a832a8;
        }

        .pink {
            background-color: #ff00ff;
        }

        .brown {
            background-color: #a83232;
        }

        .black {
            background-color: #000000;
        }

        .white {
            background-color: #ffffff;
        }

        .grey {
            background-color: #808080;
        }

        .beige {
            background-color: #f5f5dc;
        }

        .turquoise {
            background-color: #40e0d0;
        }

        .gold {
            background-color: #ffd700;
        }

        .silver {
            background-color: #c0c0c0;
        }

        .bronze {
            background-color: #cd7f32;
        }

    }
}

.selected {
    transform: scale(1.2);
    transition: transform 0.2s ease-in-out;
}
</style>