<template>
    <div class="menu-button" @click="goTo(link)">
        <i :class="icon"></i>
        <p class="text">{{ textButton }}</p>
    </div>
</template>

<script>
export default {
    name: "MenuButton",

    data() {
        return {
            textButton: "?",
            icon: "fas fa-question-circle"
        }
    },

    props: {
        type: String,
        link: String
    },

    mounted() {
        if (this.type === "home") {
            this.textButton = "Accueil"
        } else if (this.type === "test") {
            this.textButton = "Test"
        } else if (this.type === "ressources") {
            this.textButton = "Ressources"
        } else if (this.type === "blog") {
            this.textButton = "Blog"
        } else if (this.type === "contact") {
            this.textButton = "Contact"
        } else if (this.type === "account") {
            this.textButton = "Mon compte"
        } else if (this.type === "search") {
            this.textButton = "Recherche"
        } else if (this.type === "connexion") {
            this.textButton = "Connexion"
        }

        if (this.type === "home") {
            this.icon = "fas fa-home"
        } else if (this.type === "test") {
            this.icon = "fas fa-gamepad"
        } else if (this.type === "ressources") {
            this.icon = "fas fa-book"
        } else if (this.type === "blog") {
            this.icon = "fas fa-comment"
        } else if (this.type === "contact") {
            this.icon = "fas fa-envelope"
        } else if (this.type === "account") {
            this.icon = "fas fa-user"
        } else if (this.type === "search") {
            this.icon = "fas fa-search"
        } else if (this.type === "connexion") {
            this.icon = "fas fa-sign-in-alt"
        }
    },

    methods: {
        goTo(page) {
            this.$router.push(page);
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/variables.scss";

.menu-button {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 0 16px;
    cursor: pointer;

    & * {
        color: $primary-brown;
        transition: color 0.5s ease-in-out;
    }

    &:hover * {
        color: $primary-blue;
    }

    i {
        font-size: 1.2rem;
    }

    .text {
        white-space: nowrap;
        line-height: 1;
        margin-top: 8px;
    }
}
</style>