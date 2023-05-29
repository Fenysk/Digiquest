<template>
    <div id="comments">
        <h2>Commentaires</h2>

        <ol class="rules">
            <li>Soyez respectueux envers l'auteur et les autres lecteurs.</li>
            <li>
                Restez constructif et évitez les critiques non-constructives et
                les attaques personnelles.
            </li>
            <li>
                Ne partagez pas d'informations personnelles (adresses, numéros
                de téléphone, etc.).
            </li>
            <li>Evitez les contenus inappropriés</li>
            <li>Evitez le spam</li>
        </ol>

        <div class="container">
            <ul class="comments">
                <li class="comment"></li>
            </ul>
        </div>

        <form class="container">
            <textarea
                placeholder="Partagez votre avis et votre expérience..."
                v-model="user_comment"
            ></textarea>

            <div class="flex justify-center mt-4">
                <Button
                    class="cursor-pointer"
                    text="Poster"
                    @click="postComment"
                />
            </div>
        </form>
    </div>
</template>

<script>
import Button from "@/components/elements/Button.vue";
export default {
    name: "Comments",
    components: {
        Button,
    },

    data() {
        return {
            user_comment: "",
        };
    },

    methods: {
        postComment() {
            console.log(this.user_comment);
        },
    },
};
</script>

<style lang="scss" scoped>

</style>