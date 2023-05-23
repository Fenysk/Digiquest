<template>
    <div class="
    connexion
    xl:px-64 lg:px-32 md:px-16 sm:px-8 px-4 ease-in-out duration-300 py-16
    ">
        <h2 class="text-center">Connexion</h2>
        <form @submit.prevent="login" class="mt-6">

            <input type="username" id="username" placeholder="Pseudo" v-model="user.username" required autofocus @keyup.enter="$refs.password.focus()" />

            <input type="password" id="password" placeholder="Mot de passe" v-model="user.password" required ref="password" @keyup.enter="login" />

            <div class="flex justify-center mt-4">
                <Button :text="'Se connecter'" type="submit" class="cursor-pointer" @click="login" />
                <Button :text="'S\'inscrire'" type="submit" class="cursor-pointer" @click="signup" secondary />
            </div>

        </form>
    </div>    
</template>

<script>
import axios from "axios";

import Button from "../../components/elements/Button.vue";
import { render } from "vue";

export default {
    name: "ConnexionView",

    components: { Button },

    data() {
        return {
            user: {
                username: '',
                password: '',
            },
            token: '',
        };
    },

    methods: {
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
                    })
                })
                .catch(error => {
                    console.log(error);
                })
        },

        async signup() {
            const apiUrl = 'https://digiquest-back.herokuapp.com';
            axios.post(`${apiUrl}/user`,
                {
                    "username": this.user.username,
                    "password": this.user.password,
                    "email": "test4",
                    "firstName": "Test4",
                    "lastName": "Test4",
                    "birthDate": "2000-04-22T05:35:00.543Z"
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            ).then(response => {
                    console.log(response.data);
                    localStorage.setItem('token', response.token);
                    this.token = response.data.token;
                    this.$router.push('/my-account');
                })
                .catch(error => {
                    console.log(error);
                })
        },
    },

    mounted() {
        if (localStorage.getItem('token')) {
            this.$router.push('/my-account');
        }
    }
}
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

</style>