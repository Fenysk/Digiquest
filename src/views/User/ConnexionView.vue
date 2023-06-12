<template>
    <div class="
    connexion
    xl:px-64 lg:px-32 md:px-16 sm:px-8 px-4 ease-in-out duration-300 py-16
    ">
        <h2 class="text-center">Connexion</h2>
        <form @submit.prevent="login" class="mt-6">

            <input type="username" id="username" placeholder="Pseudo" v-model="user.username" required autofocus/>

            <input v-if="isSignUp" type="firstName" id="firstName" placeholder="Prénom" v-model="user.firstName" required />

            <input v-if="isSignUp" type="lastName" id="lastName" placeholder="Nom" v-model="user.lastName" required />

            <input v-if="isSignUp" type="text" id="email" placeholder="Email" v-model="user.email" required />

            <input type="password" id="password" placeholder="Mot de passe" v-model="user.password" required />

            <input v-if="isSignUp" type="date" id="birthDate" placeholder="Date de naissance" v-model="user.birthDate" required />



            <div class="flex justify-center mt-4">
                <Button class="cursor-pointer"
                    :text="isSignUp ? 'S\'inscrire' : 'Se connecter'"
                    @click="isSignUp ? signup() : login()"
                />
                <Button class="cursor-pointer"
                    :text="isSignUp ? 'J\ai déjà un compte' : 'Je n\'ai pas de compte'"
                    @click="switchMode" 
                    secondary
                />
            </div>
        </form>
        
        <ul v-if="isSignUp" class="conditions">
            <h3 class="mb-4">RGPD et données personnelles</h3>
            <li>Nous stockons vos informations personnelles (nom, prénom, email, date de naissance, résultat de tests) afin de vous identifier sur le site.</li>
            <li>Nous ne les divulguerons jamais à qui que ce soit sans votre accord.</li>
            <li>Elles seront automatiquement effacées lors de votre désinscription.</li>
        </ul>
    </div>    
</template>

<script>
import axios from "axios";
import { postLogin } from "@/api/Auth/postLogin.js";
import { postUser } from "@/api/Auth/postUser.js";

import Button from "../../components/elements/Button.vue";

export default {
    name: "ConnexionView",

    components: { Button },

    data() {
        return {
            user: {
                username: '',
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                birthDate: '',
                birthDateFormatted: '',
            },
            token: '',

            isSignUp: false,
        };
    },

    watch: {
        'user.birthDate': function (val) {
            console.log(val);
            this.user.birthDateFormatted = val + 'T12:00:00.000Z';
        }
    },

    methods: {

        switchMode() {
            this.isSignUp = !this.isSignUp;
            console.log(this.isSignUp);
        },

        async login() {
            const apiUrl = 'https://digiquest-back.herokuapp.com';
            axios.post(`${apiUrl}/login`,
                {
                    "username": this.user.username,
                    "password": this.user.password,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            ).then(response => {
                    console.log(response.data);
                    localStorage.setItem('token', response.data.token);
                    this.token = response.data.token;
                    this.$nextTick(() => {
                        window.location.reload();
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
        },

        async signup() {
            try {
              const payload = {
                  "username": this.user.username,
                  "password": this.user.password,
                  "email": this.user.email,
                  "firstName": this.user.firstName,
                  "lastName": this.user.lastName,
                  "birthDate": this.user.birthDateFormatted,
              }
              const response = await postUser(payload);
              localStorage.setItem('token', response.token);
              this.token = response.token;
              this.$nextTick(() => {
                window.location.reload();
              })
            } catch (error) {
              console.log(error);
            }
        },
    },

    mounted() {
        try {
            if (localStorage.getItem("token")) {
                this.$router.push("/my-account");
            }
        } catch (error) {
            this.$router.push("/connexion");
        }
    },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/variables.scss";

form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
}

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
.conditions {
    padding: 24px 32px;
    border-radius: 10px;
    margin-top: 24px;
    background-color: $secondary-blue;
    li {
        color: $primary-brown;
        list-style-type: disc;
        margin-left: 24px;
    }
}
</style>