<template>
    <div class="new-article">
        <h1>Nouvel article</h1>
        <form @submit.prevent="createArticle">
            <label for="title">Titre:</label>
            <input type="text" id="title" v-model="article.title" required>

            <label for="content">Contenu:</label>
            <textarea id="content" v-model="article.content" required></textarea>

            <label for="image">Image:</label>
            <input type="text" id="image" v-model="article.image">

            <label for="tags">Tags:</label>
            <input type="text" id="tags" v-model="article.tags">

            <button type="submit">Créer</button>
        </form>
    </div>
</template>
  
<script>
import axios from 'axios';

export default {
    data() {
        return {
            article: {
                title: '',
                content: '',
                image: '',
                tags: []
            }
        };
    },
    methods: {
        createArticle() {
            const apiUrl = 'https://digiquest-back.herokuapp.com';
            axios.post(
                `${apiUrl}/article`,
                {
                    title: this.article.title,
                    content: this.article.content,
                    image: this.article.image,
                    tags: this.article.tags
                }
            )
                .then(response => {
                    console.log('Nouvel article créé:', response.data);
                    // Faire quelque chose avec la réponse, par exemple rediriger vers la page de l'article créé
                })
                .catch(error => {
                    console.error('Erreur lors de la création de l\'article:', error);
                    // Gérer l'erreur, afficher un message à l'utilisateur, etc.
                });
        }
    }
};
</script>
  
<style lang="scss" scoped>
.new-article {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;

    h1 {
        font-size: 24px;
        margin-bottom: 20px;
    }

    form {
        display: flex;
        flex-direction: column;

        label {
            font-weight: bold;
            margin-bottom: 5px;
        }

        input,
        textarea {
            padding: 10px;
            margin-bottom: 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
        }

        button {
            padding: 10px 20px;
            background-color: #007bff;
            color: #fff;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            transition: background-color 0.3s;

            &:hover {
                background-color: #0056b3;
            }
        }
    }
}
</style>
  