<template>
    <a :href="`/blog/article/${article.id}`" class="flex mt-8 gap-8"
        :class="article.id % 2 === 0 ? 'flex-row-reverse' : ''">
        <img :src="article.image" :alt="article.title" />
        <div>
            <h2 class="mt-4">{{ article.title }}</h2>
            <p v-if="type === 'ressources' && article.id === 2">
                <h3>Chez l'adulte</h3>
                <ul>
                    <li v-for="item, index of adultProfessionals">
                      <a :href="'ressources/professionnals/'+item.id"> {{item.firstName}} {{item.lastName}}
                      </a>
                    </li>
                </ul>
                <p><br></p>
                <p><br></p>
                <h3>Chez l'enfant</h3>
                <ul>
                    <li v-for="item, index of childrenProfessionals">
                      <a :href="'ressources/professionnals/'+item.id"> {{item.firstName}} {{item.lastName}}
                      </a>
                    </li>
                </ul>
            </p>
            <p v-else class="mt-4" v-html="truncateHTML(article.content, 500)"></p>
        </div>
    </a>
</template>

<script>
import { getProfessionals } from '@/api/Professional/getProfessionals';
export default {
    name: "Miniature",

    async mounted() {
      this.professionals = await getProfessionals()
    },
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
      return{
        professionals: []
      }
    },

    methods: {
        truncateHTML(html, maxLength) {
            const truncated = html.replace(/<[^>]+>/g, "");
            return truncated.length > maxLength
                ? truncated.substr(0, maxLength - 1) + "..."
                : truncated;
        },
    },
    computed: {
      adultProfessionals(){
        return this.professionals.filter(item => item.specialtyId !== 2)
      },
      childrenProfessionals(){
        return this.professionals.filter(item => item.specialtyId === 2)
      },
    }
};
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