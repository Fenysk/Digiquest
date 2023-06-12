<template>
    <div id="contact" class="
    xl:px-64 lg:px-32 md:px-16 sm:px-8 px-4 ease-in-out duration-300 py-16
    ">
        <h1 class="text-center">Vous souhaitez nous contactez ?</h1>
        <h2 class="mt-8 text-center">Vous pouvez nous contacter via ce formulaire</h2>

        <form class="mt-16">
            <div class="flex flex-row items-center space-x-4" v-if="!isConnected">
                <div class="flex flex-col">
                    <label>Votre Prénom</label>
                    <input v-model="user.firstName" type="text" class="border-2 border-gray-300 rounded-md p-2" />
                </div>
                <div class="flex flex-col">
                    <label>Votre Nom</label>
                    <input v-model="user.lastName" type="text" class="border-2 border-gray-300 rounded-md p-2" />
                </div>
            </div>

            <div class="flex flex-col mt-4" v-if="!isConnected">
                <label>Votre adresse e-mail</label>
                <input v-model="user.email" type="email" class="border-2 border-gray-300 rounded-md p-2" />
            </div>

            <div class="flex flex-col mt-4">
                <label>Que souhaitez-vous nous dire ?</label>
                <textarea v-model="message" class="border-2 border-gray-300 rounded-md p-2" rows="6"
                ></textarea>
            </div>

            <div class="flex justify-center mt-4">
                <Button :text="'Envoyer'" @click="sendMessage" class="cursor-pointer" />
            </div>
        </form>
    </div>
</template>

<script>
import { getProfile } from '@/api/User/getProfile';
import jwtDecode from 'jwt-decode';

import Button from "@/components/elements/Button.vue";

export default {
    name: "ContactView",

    components: {
        Button,
    },

    data() {
        return {
            isConnected: false,
            user: '',
            token: '',
            message: '',
        }
    },

    mounted() {
        if (localStorage.getItem('token') !== null) {
            this.isConnected = true;
            const token = localStorage.getItem('token');
            const userId = jwtDecode(token).userId;

            getProfile(userId)
                .then((user) => {
                    this.user = user;
                })
                .catch((error) => {
                    console.error('Erreur lors de la récupération du profil:', error);
                });
        }
    },
}
</script>

<style></style>