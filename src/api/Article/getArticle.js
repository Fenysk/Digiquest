import axios from 'axios';

export async function getArticle(articleId) {
    
    try {
        const response = await axios.get(`${process.env.VUE_APP_API_URL}/articles/${articleId}`);
        const article = response.data;
        console.log('Article récupéré :', article);
        return article;
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'article :', error);
        throw error;
    }
}