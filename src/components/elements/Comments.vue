<template>
    <div id="comments">
        <h2 class="text-center">Commentaires</h2>

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
                <li
                    class="comment"
                    v-for="comment in comments"
                    :key="comment.id"
                >
                    <div class="comment-header">
                        <span class="comment-author">{{
                            comment.accountId
                        }}</span>
                    </div>
                    <p class="comment-content">{{ comment.content }}</p>
                </li>
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
                    text="Envoyer mon avis"
                    @click="postComment"
                />
            </div>
        </form>
    </div>
</template>

<script>
import jwtDecode from "jwt-decode";

import Button from "@/components/elements/Button.vue";

import { getComments } from "@/api/Comment/getComments";
import { postComment } from "@/api/Comment/postComment";
import { getProfile } from "@/api/User/getProfile";

export default {
    name: "Comments",
    components: {
        Button,
    },

    props: {
        articleId: {
            type: Array,
            required: true,
        },
    },

    data() {
        return {
            user_comment: "",
            comments: [],
            commentsAuthor: [],
        };
    },

    methods: {
        postComment() {
            const token = localStorage.getItem("token");

            var currentComments = JSON.parse(
                localStorage.getItem("currentComments")
            );

            const comment = {
                articleId: this.articleId,
                content: this.user_comment,
            };

            // supprimer les précédents commentaires du meme article
            for (let i = 0; i < currentComments.length; i++) {
                if (currentComments[i].articleId === this.articleId) {
                    console.log(
                        "suppression du commentaire :",
                        currentComments[i]
                    );
                    currentComments.splice(i, 1);
                }
            }

            currentComments.push(comment);

            console.log(currentComments);

            if (token) {
                const accountId = jwtDecode(token).userId;
                
                postComment(accountId, comment.articleId, comment.content)
                    .then((comment) => {
                        console.log("Le commentaire a été posté :", comment);
                        this.getComments(this.articleId);
                    })
                    .catch((error) => {
                        console.error(
                            "Erreur lors de la création du commentaire:",
                            error
                        );
                    });
                this.user_comment = "";
                console.log("Le commentaire a été posté :", comment);
                this.getComments(this.articleId);
            } else {
                localStorage.setItem(
                    "currentComments",
                    JSON.stringify(currentComments)
                );
                this.$router.push("/connexion");
            }
        },

        getComments(articleId) {
            getComments(articleId)
                .then((comments) => {
                    this.comments = comments;
                })
                .catch((error) => {
                    console.error(
                        "Erreur lors de la récupération des commentaires:",
                        error
                    );
                });
            this.comments.forEach((comment) => {
                getProfile(comment.accountId)
                    .then((profile) => {
                        this.commentsAuthor.push(profile);
                    })
                    .catch((error) => {
                        console.error(
                            "Erreur lors de la récupération du profil de l'auteur du commentaire:",
                            error
                        );
                    });
            });
        },
    },

    updated() {
        this.$nextTick(function () {
            this.getComments(this.articleId);
        });
    },


    mounted() {
        if (this.user_comment == "") {
            if (localStorage.getItem("currentComments") === null) {
                localStorage.setItem("currentComments", JSON.stringify([]));
            }

            const currentComments = JSON.parse(
                localStorage.getItem("currentComments")
            );

            console.log("Commentaires en cours d'écriture :", currentComments);

            for (let i = 0; i < currentComments.length; i++) {
                if (currentComments[i].articleId === this.articleId) {
                    this.user_comment = currentComments[i].content;
                }
            }
        }
    },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";
#comments {
    background-color: $secondary-blue;
    margin-top: 4rem;
    padding-top: 2rem;
    padding-bottom: 2rem;

    form {
        margin-top: 2rem;
        margin-bottom: 2rem;
    }

    textarea {
        width: 100%;
        height: 10rem;
        padding: 1rem;
        border: 2px solid $secondary-green;
        background-color: rgba($primary-white, 0.7);
        border-radius: 0.5rem;
        resize: none;

        &:focus {
            outline-color: $primary-blue;
        }
    }

    .comment {
        width: 100%;
        background-color: rgba($primary-white, 0.7);
        border-radius: 0.5rem;
        padding: 1rem;
        margin-bottom: 1rem;
    }
}
</style>