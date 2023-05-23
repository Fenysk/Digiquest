import axios from 'axios';

export async function getArticle(articleId) {
    const apiUrl = 'https://digiquest-back.herokuapp.com';
    
    try {
        const response = await axios.get(`${apiUrl}/article/${articleId}`);
        const article = response.data;
        console.log('Article récupéré :', article);
        return article;
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'article :', error);
        throw error;
    }
}