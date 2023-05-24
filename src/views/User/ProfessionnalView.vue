<template>
    <div id="professionnal-view" class="
    xl:px-64 lg:px-32 md:px-16 sm:px-8 px-4 ease-in-out duration-300 py-16
    ">
        <h1 class="text-center">ProfessionnalView</h1>
    </div>
</template>

<script>
import data from '@/assets/data.json';

export default {
    name: "ProfessionnalView",

    data() {
        return {
            professionnal: {},
        }
    },

    methods: {
        getProfessionnal(id) {
            this.professionnal = data.professionnals.find(professionnal => professionnal.id === id);
            console.log(data.professionnals);
        }
    },

    mounted() {
        const id = this.$route.params.id;
        console.log(id);
        this.getProfessionnal(id);
    }
}
</script>

<style>

</style>