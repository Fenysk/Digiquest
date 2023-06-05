<template>
    <a :href="`/blog/article/${article.id}`" class="flex mt-8 gap-8" :class="article.id % 2 === 0 ? 'flex-row-reverse' : ''">
        <img :src="article.image" :alt="article.title" />
        <div>
            <h3 class="mt-4">{{ article.title }}</h3>
            <p v-if="type === 'ressources' && article.id === 2" >
                <h3>Chez l'adulte</h3>
                <ul>
                    <li v-for="item, index of professionals">
                      <a :href="'ressources/professionnals/'+item.id"> {{item.firstName}} {{item.lastName}}
                      </a>
                    </li>


                  <!--
                  <li>
                    <a href="ressources/professionnals/1" rel="noopener noreferrer" target="_blank">Professionnel 1</a>
                  </li>
                  <li>
                    <a href="http://localhost:8080/ressources/professionnals/2" rel="noopener noreferrer" target="_blank">Professionnel 2</a>
                  </li>
                  <li>
                    <a href="http://localhost:8080/ressources/professionnals/3" rel="noopener noreferrer" target="_blank">Professionnel 3</a>
                  </li>
                  <li>
                    <a href="http://localhost:8080/ressources/professionnals/4" rel="noopener noreferrer" target="_blank">Professionnel 4</a>
                  </li>
                  -->
                </ul>
                <p>
                  <br>
                </p>
                <p>
                  <br>
                </p>
                
                <h3>Chez l'enfant</h3><ul><li><a href="http://localhost:8080/ressources/professionnals/1" rel="noopener noreferrer" target="_blank">Professionnel 1</a></li><li><a href="http://localhost:8080/ressources/professionnals/2" rel="noopener noreferrer" target="_blank">Professionnel 2</a></li><li><a href="http://localhost:8080/ressources/professionnals/3" rel="noopener noreferrer" target="_blank">Professionnel 3</a></li><li><a href="http://localhost:8080/ressources/professionnals/4" rel="noopener noreferrer" target="_blank">Professionnel 4</a></li></ul>
            </p>
            <p v-else class="mt-4" v-html="truncateHTML(article.content, 500)"></p>
        </div>
    </a>
</template>

<script>
import { getProfessionals } from '@/api/Professional/getProfessionals';

export default {
    name: "Miniature",

    props: {
        article: {
            type: Object,
            required: true,
        },
        type: {
            type: String,
            required: false,
        },
    },

    data() {
      return {
        professionals: [],
      }
    },

    methods: {
        truncateHTML(html, maxLength) {
            const truncated = html.replace(/<[^>]+>/g, '');
            return truncated.length > maxLength ? truncated.substr(0, maxLength - 1) + '...' : truncated;
        },
    },

    async mounted() {
      // if resource is professional, fetch list from database
      if (this.type === 'ressources' && this.article.id === 2) {
        try {
          this.professionals = await getProfessionals();
        } catch (error) {
          console.log('Error while retrieving professionals')
        } 
      }
    }
}
</script>

<style lang="scss" scoped>
img {
    width: 50%;
    aspect-ratio: 16/9;
    object-fit: cover;
    margin-right: 2rem;
    border-radius: 10px;
}
</style>