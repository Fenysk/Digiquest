<template>
    <a  :class="secondary ? 'secondary' : 'primary'"
        :href="href"
        :target="blank ? '_blank' : '_self'"
    >
        {{ text }}
    </a>
</template>

<script>
export default {
    name: "Button",
    props: {
        text: {
            type: String,
            required: true
        },
        href: {
            type: String,
            required: true
        },
        blank: {
            type: Boolean,
            default: false
        },
        secondary: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/variables.scss";

a {
    display: inline-block;

    padding: 12px 24px;
    margin: 10px;
    text-decoration: none;
    border-radius: 100px;
    font-size: 1.2rem;
    white-space: nowrap;
}

a.primary {
    background-color: $primary-blue;
    color: $secondary-white;
    border: 3px solid $primary-blue;
    transition: all 0.3s ease-in-out;

    &:hover {
        background-color: rgba($color: #000000, $alpha: 0);
        color: $primary-blue;
    }
}

a.secondary {
    color: $primary-brown;
    border: 3px solid $primary-brown;
    transition: all 0.3s ease-in-out;

    &:hover {
        background-color: $primary-yellow;
        color: $primary-brown;
        border-color: $primary-yellow;
    }
}
</style>