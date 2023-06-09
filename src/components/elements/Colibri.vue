<template>
    <div class="colibri">
        <img class="aile aile--gauche" src="@/assets/Colibris/Bébé_colibri_1_-_Aile_arrière.png" alt="Colibri" />
        <img class="corps" src="@/assets/Colibris/Bébé_colibri_1_-_Corps_foncé.png" alt="Colibri" />
        <img class="aile aile--droite" src="@/assets/Colibris/Bébé_colibri_1_-_Aile_avant.png" alt="Colibri" />
    </div>
</template>

<script>

const idleAileDroit = gsap.timeline({
    repeat: -1,
});
const idleAileGauche = gsap.timeline({
    repeat: -1,
    delay: 0.2,
});
const idleCorps = gsap.timeline({
    repeat: -1,
});

export default {
    name: "Colibri",

    props: {
        color: {
            type: String,
            default: "dark"
        },
        mood: {
            type: String,
            default: "neutral"
        },
        animation: {
            type: String,
            default: "idle"
        }
    },

    methods: {
        animate(animation) {
            if (animation === "setup") {

                gsap.set('.aile--droite', {

                    scale: 0.7,

                });

                gsap.set('.aile--gauche', {

                    x: -220,
                    y: -230,
                    rotation: 5,
                    scale: 0.5,

                });

            }

            if (animation === "idle") {

                idleCorps.fromTo('.colibri', {

                    rotation: 5,

                }, {

                    rotation: -5,
                    duration: 3,
                    delay: 0.5,
                    yoyo: true,
                    repeat: -1,
                    ease: "power4.inOut",

                });

                idleAileDroit.fromTo('.aile--droite', {

                    x: -250,
                    y: -150,
                    rotation: 0,
                    
                }, {
                    
                    x: -250,
                    y: -70,
                    rotation: -38,
                    duration: 1,

                });

                idleAileGauche.fromTo('.aile--gauche', {

                    x: -220,
                    y: -230,
                    rotation: 5,

                }, {

                    x: -220,
                    y: -150,
                    rotation: -38,
                    duration: 0.8,

                });

                idleAileDroit.fromTo('.aile--droite', {

                    x: -250,
                    y: -70,
                    rotation: -38,

                }, {

                    x: -250,
                    y: -150,
                    rotation: 0,
                    duration: 1,

                });

                idleAileGauche.fromTo('.aile--gauche', {

                    x: -220,
                    y: -150,
                    rotation: -38,

                }, {

                    x: -220,
                    y: -230,
                    rotation: 5,
                    duration: 1,

                });

            }
        }
    },

    mounted() {
        this.animate('setup');
        this.animate('idle');
    }
}
</script>

<style lang="scss" scoped>
.colibri {
    position: relative;

    width: 500px !important;
    height: 500px !important;

    .corps,
    .aile {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;

        width: 100% !important;
        height: 100% !important;
    }
}
</style>