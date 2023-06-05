<template>
    <div id="professionnal-view" class="
    xl:px-64 lg:px-32 md:px-16 sm:px-8 px-4 ease-in-out duration-300 py-16
    ">
        <div class="header flex justify-center items-center">
          <!-- TODO
            <img :src="professionnal.photo" />
          -->
            <div>
                <h1 class="text-center">{{ professional.firstName }} {{ professional.lastName }}</h1>
                <Breadcrumb class="mt-12" />
            </div>
        </div>

        <h3 class="text-center mt-24">Expertises et actes</h3>
        <ul class="flex justify-center mt-8">
          <li class="flex">
            <p class="ml-8">{{ professional.specialty.label }}</p>
          </li>
          <!--
            <li class="flex" v-for="specialitie in professionnal.specialities" :key="specialitie.id">
                <p class="ml-8">{{ specialitie }}</p>
                <p v-if="professionnal.specialities.length > 1 && professionnal.specialities.indexOf(specialitie) !== professionnal.specialities.length - 1" class="ml-6">—</p>
            </li>
          -->
        </ul>

        <div class="mt-24 flex flex-row gap-16">
            <div class="presentation w-2/3">
                <h3 class="text-center">Présentation</h3>
                <p class="mt-8">{{ professional.description }}</p>
            </div>
            <div class="coordonnees w-1/3 flex flex-col items-center">
                <h3 class="text-center">Coordonnées</h3>
                <p class="mt-8">{{ professional.address }}</p>
                <p class="mt-4">{{ professional.phone }}</p>
                <!-- TODO
                <Button :text="'Prendre rendez-vous'" :href="`mailto:${professionnal.email}`" secondary class="cursor-pointer" />
                -->
            </div>
        </div>
    </div>
</template>

<script>
import data from '@/assets/data.json';

import { getProfessional } from '@/api/Professional/getProfessional';

import Breadcrumb from '@/components/elements/Breadcrumb.vue';
import Button from '@/components/elements/Button.vue';

export default {
    name: "ProfessionnalView",

    components: { Breadcrumb, Button },

    data() {
        return {
            professional: {
              id: 0,
              firstName: '',
              lastName: '',
              description: '',
              address: '',
              phone: '',
              specialty: {
                id: 0,
                label: ''
              }
            },

        }
    },

    methods: {
      /*
        getProfessionnal(id) {
            console.log(id);
            this.professionnal = data.professionnals.find(professionnal => professionnal.id === parseInt(id));
            console.log(this.professionnal);
        }
        */
    },

    async mounted() {
        const id = this.$route.params.id;
        console.log(id);
        this.professional = await getProfessional(id)
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";

img {
    width: 150px;
    aspect-ratio: 1/1;
    object-fit: cover;
    border-radius: 10px;
    margin-right: 32px;
}
</style>
