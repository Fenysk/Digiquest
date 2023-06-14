<template>
    <div v-if="show" class="cookie-banner">
        <h3>Nous respectons votre vie privée</h3>
        <div class="cookie-content flex">
            <p>Nous utilisons des cookies pour améliorer votre expérience sur notre site. En utilisant notre site, vous acceptez notre utilisation des cookies.</p>
            <div class="controls flex">
                <Button class="cursor-pointer" :text="'Tout accepter'" @click="acceptCookies" />
                <Button class="cursor-pointer" :text="'Tout refuser'" @click="hideBanner" />
                <Button class="cursor-pointer" :text="'Paramètres'" @click="hideBanner" secondary />
            </div>
        </div>
    </div>
</template>



<script>
import Button from "./Button.vue";

export default {
    name: "Cookies",

    components: {
        Button,
    },

    data() {
        return {
            show: false,
        };
    },

    mounted() {
        if (localStorage.getItem("cookieAutorisation") === null) {
            this.show = true;
        }
    },
    
    methods: {
        acceptCookies() {
            localStorage.setItem("cookieAutorisation", true);
            this.show = false;
        },

        hideBanner() {
            localStorage.setItem("cookieAutorisation", false);
            this.show = false;
        },
    },
};

</script>



<style scoped lang="scss">
@import "@/assets/scss/variables.scss";

.cookie-banner {
    background-color: $secondary-blue;
    width: 100%;
    padding: 24px 10%;

    @media (max-width: 1000px) {
        padding: 20px 5%;
    }

    @media (max-width: 500px) {
        padding: 16px 2%;
    }
}

.cookie-content {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    @media (max-width: 1000px) {
        flex-direction: column;
    }
}

.controls {
    display: flex;
    flex-direction: row;
    justify-content: space-around;

    @media (max-width: 1000px) {
        flex-direction: column;
        width: 100%;

        Button {
            margin-bottom: 10px;
            width: 100%;
        }
    }
}
</style>
