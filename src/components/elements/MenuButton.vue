<template>
    <div class="menu-button" @click="goTo(link)" :class="mode">
        <img
            class="icon"
            :src="require(`@/assets/picto/menu/${icon}.svg`)"
            inline
        />

        <p class="text">{{ textButton }}</p>
    </div>
</template>

<script>
export default {
    name: "MenuButton",

    data() {
        return {
            textButton: "?",
            icon: "home",
        };
    },

    props: {
        type: String,
        link: String,
        mode: String,
    },

    mounted() {
        if (this.type === "home") {
            this.textButton = "Accueil";
        } else if (this.type === "test") {
            this.textButton = "Test";
        } else if (this.type === "ressources") {
            this.textButton = "Ressources";
        } else if (this.type === "blog") {
            this.textButton = "Blog";
        } else if (this.type === "contact") {
            this.textButton = "Contact";
        } else if (this.type === "account") {
            this.textButton = "Mon compte";
        } else if (this.type === "search") {
            this.textButton = "Recherche";
        } else if (this.type === "connexion") {
            this.textButton = "Connexion";
        }

        if (this.type === "home") {
            this.icon = "home";
        } else if (this.type === "test") {
            this.icon = "gamepad";
        } else if (this.type === "ressources") {
            this.icon = "folder";
        } else if (this.type === "blog") {
            this.icon = "file";
        } else if (this.type === "contact") {
            this.icon = "letter";
        } else if (this.type === "account") {
            this.icon = "me";
        } else if (this.type === "search") {
            this.icon = "search";
        } else if (this.type === "connexion") {
            this.icon = "me";
        }
    },

    methods: {
        goTo(page) {
            this.$router.push(page);
        },
    },
};
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

    &.mobile {
        flex-flow: row nowrap;
        justify-content: flex-start;
        align-items: center;

        .icon {
            margin-right: 12px;
            height: 48px;
            width: 48px;
        }

        .text {
            margin: 0;
            font-size: 32px;
        }
    }

    & * {
        color: $primary-brown;
        transition: color 0.2s ease-in-out;
    }

    &:hover * {
        color: $primary-blue;
    }

    .icon {
        height: 32px;
        width: 32px;
        fill: $primary-brown;
        color: $primary-brown;

        & {
            fill: $primary-blue !important;
            color: $primary-blue !important;
        }
    }

    p {
        font-size: 20px;
    }

    .text {
        white-space: nowrap;
        line-height: 1;
        margin-top: 8px;
    }
}
</style>