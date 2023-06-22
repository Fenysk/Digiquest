import axios from 'axios';

export async function getArticleComments(articleId) {
    
    try {
        const response = await axios.get(`${process.env.VUE_APP_API_URL}/articles/${articleId}/comments`);
        const comments = response.data;
        console.log('Commentaires récuperés :', comments);
        return comments;
    } catch (error) {
        console.error('Erreur lors de la récupération des commentaires :', error);
        throw error;
    }
}