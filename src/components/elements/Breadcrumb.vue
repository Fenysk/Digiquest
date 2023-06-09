<template>
    <nav class="text-center breadcrumb my-12">
        <span v-for="(item, index) in breadcrumb" :key="index">
            <router-link v-if="!last || (last && index < breadcrumb.length - 1)"
             class="text-2xl link" :to="`${item.link}`">{{ item.text }}</router-link>
            <span class="text-2xl link" v-else>{{ last }}</span>
            <span class="text-2xl primary-brown" v-if="index < breadcrumb.length - 1">/</span>
        </span>
    </nav>
</template>

<script>
export default {
    name: "Breadcrumb",

    data() {
        return {
            breadcrumb: this.$route.meta.breadcrumb,
        }
    },

    props: {
        last: {
            type: String,
            required: false
        }
    },

    methods: {
        isLast(index) {
            return index === this.breadcrumb.length - 1;
        }
    },
}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/variables.scss";

.link {
    color: $primary-brown;
}
</style>