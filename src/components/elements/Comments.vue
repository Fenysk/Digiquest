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
                {{ account }}
                <li class="comment
                flex
                " v-for="comment in comments" :key="comment.id">
                    <div class="account">
                        <div class="avatar-color" :class="comment.account.avatarColor" style="border-radius:50%;">
                          <img class="avatar-animal" :src="require(`@/assets/picto/animals/${comment.account.avatarAnimal}.svg`)"/>
                        </div>
                    </div>
                    <div class="content">
                        <div class="comment-header">
                            <b><span class="comment-author">{{ comment.account.username }}</span></b>
                        </div>
                        <p class="comment-content">{{ comment.content }}</p>
                    </div>
                </li>
            </ul>
        </div>

        <form class="container">
            <textarea placeholder="Partagez votre avis et votre expérience..." v-model="user_comment"></textarea>

            <div class="flex justify-center mt-4">
                <Button class="cursor-pointer" text="Envoyer mon avis" @click="postComment" />
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
            isConnected: false,
            accounts: {},
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
                .then(async (comments) => {
                    const newComments = await Promise.all(comments.map(async (comment) => {
                        const profile = await getProfile(comment.accountId);
                        return { ...comment, avatarAnimal: profile.avatarAnimal };
                    }));

                    this.comments = newComments;
                })
                .catch((error) => {
                    console.error(
                        "Erreur lors de la récupération des commentaires:",
                        error
                    );
                });
        },

    },

    async mounted() {

        const id = this.$route.params.id;
        this.getComments(id);

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

    .avatar-color{
      height: 100px;
      width: 100px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .avatar-animal {
        width: 75px;
        height: 75px;
        display: block;
    }

    .comment {
        width: 100%;
        background-color: rgba($primary-white, 0.7);
        border-radius: 0.5rem;
        padding: 1rem;
        margin-bottom: 1rem;
    }
    .red {
            background-color: #bf1212;
    }

    .orange {
        background-color: #ff7f00;
    }

    .yellow {
        background-color: rgb(255, 242, 0);
    }

    .green {
        background-color: #13d413;
    }

    .blue {
        background-color: #1111d8;
    }

    .purple {
        background-color: #a832a8;
    }

    .pink {
        background-color: #ff00ff;
    }

    .brown {
        background-color: #a83232;
    }

    .black {
        background-color: #000000;
    }

    .white {
        background-color: #ffffff;
    }

    .grey {
        background-color: #808080;
    }

    .beige {
        background-color: #f5f5dc;
    }

    .turquoise {
        background-color: #40e0d0;
    }

    .gold {
        background-color: #ffd700;
    }

    .silver {
        background-color: #c0c0c0;
    }

    .bronze {
        background-color: #cd7f32;
    }
}
</style>