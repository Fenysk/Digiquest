<template>
    <div class="pagination" v-if="pages.length > 1">

        <nav class="flex justify-center">
            <ul class="pagination-list flex">
                <li v-for="page in pages" :key="page" class="pagination-item">
                    <Button :text="page" :href="`/blog/page/${page}`" secondary v-if="pageIsNearby(page)" :class="currentPage == page ? 'pagination-item--active' : ''" />
                    <Button v-else-if="pageIsFirst(page)" :text="'Première page'" :href="`/blog/page/1`" secondary />
                    <Button v-else-if="pageIsLast(page)" :text="`Dernière page`" :href="`/blog/page/${pages.length}`" secondary />
                </li>
            </ul>
        </nav>
        
    </div>
</template>

<script>
import Button from './Button.vue';
export default {
    components: { Button },
    name: "Pagination",

    props: {
        currentPage: {
            type: Number,
            required: true
        },
        articlesPerPages: {
            type: Number,
            required: true
        },
        articleCount: {
            type: Number,
            required: true
        }
    },

    data() {
        return {
            pages: []
        }
    },

    watch: {
        articleCount() {
            this.getPages();
        }
    },

    methods: {
        getPages() {
            this.pages = [];
            for (let i = 1; i <= Math.ceil(this.articleCount / this.articlesPerPages); i++) {
                this.pages.push(i);
            }
        },
        
        pageIsNearby(page) {
            const minPageToShow = parseInt(this.currentPage) - 2;
            const maxPageToShow = parseInt(this.currentPage) + 2;
            return page >= minPageToShow && page <= maxPageToShow;
        },
        pageIsFirst(page) {
            const minPageToShow = parseInt(this.currentPage) - 3;
            return page === minPageToShow
        },
        pageIsLast(page) {
            const maxPageToShow = parseInt(this.currentPage) + 3;
            return page === maxPageToShow
        }


    },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";

.pagination-item--active {
    background-color: $primary-yellow;
    border-color: $primary-yellow !important;
}
</style>