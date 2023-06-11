<template>
    <div class="
    new-article
    xl:px-64 lg:px-32 md:px-16 sm:px-8 px-4 ease-in-out duration-300 p-16
    ">
        <h2 class="text-center">Nouvel article</h2>
        <form @submit.prevent="createArticle">
            <label for="title">Titre</label>
            <input type="text" id="title" v-model="article.title" required>
            
            <label for="image">Image</label>
            <input type="text" id="image" v-model="article.image">
            
            <label for="content">Contenu</label>
            <vue-editor id="editor" v-model="article.content" />

            <!--
            <label for="tags">Tags</label>
            <input type="text" id="tags" v-model="article.tags">
            -->
            <span>Tags</span>
            <div style="display:flex;">
              <button id="tags" type="button" v-for="item,index of article.tags" :key="index" @click="removeTagAt(index)">
                {{getArticleLabel(item)}}
              </button>
            </div>
            ---
            <span>Tags disponibles:</span>
            <div style="display:flex;">
              <button type="button" v-for="item, index of availableTags" :key="index" @click="addTag(item.id)">
                {{ item.label}}
              </button>
            </div>

            <button type="submit">Créer</button>
        </form>

        {{ article.content }}
    </div>
</template>
  
<script>
import axios from 'axios';
import { VueEditor } from "vue3-editor";
import  { getTags } from "@/api/Tags/getTags";

export default {
    components: { VueEditor },
    data() {
        return {
            tagList: [],
            article: {
                title: '',
                content: '',
                image: '',
                tags: []
            },
        };
    },

    computed:{
        availableTags() {
            const available = this.tagList.filter(item => {
                return this.article.tags.includes(item.id) === false;
            })
            return available;
      }
    },

    async mounted() {
        try {
            // await getTags
            this.tagList = await getTags();
        } catch (error) {
            console.log(error)
        }
    },


    methods: {
        addTag(id) {
          console.log('in add')
          this.article.tags.push(id);
        },

        removeTagAt(index) {
          this.article.tags.splice(index,1)
        },

        getArticleLabel(id){
          for (const item of this.tagList){
            if (item.id === id) {
              return item.label;
            }
          }
        },

        createArticle() {
            const apiUrl = 'https://digiquest-back.herokuapp.com';
            axios.post(
                `${apiUrl}/article`,
                this.article
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
@import '@/assets/scss/variables.scss';

h1 {
    font-size: 24px;
    margin-bottom: 20px;
}

form {
    display: flex;
    flex-direction: column;
    max-width: 1000px;
    margin: auto;

    label {
        font-weight: bold;
        margin-bottom: 5px;
    }

    input {
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
</style>
  