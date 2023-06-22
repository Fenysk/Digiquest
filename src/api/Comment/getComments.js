import axios from 'axios';

export async function getComments(articleId) {
    
    try {
        const response = await axios.get(`${process.env.VUE_APP_API_URL}/articles/${articleId}/comments`);
        const comments = response.data;
        console.log('Commentaires de l\'articles :', comments);
        return comments;
    } catch (error) {
        console.error('Erreur lors de la récupération des comments :', error);
        throw error;
    }
}