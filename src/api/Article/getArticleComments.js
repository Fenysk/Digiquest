import axios from 'axios';

export async function getArticleComments(articleId) {
    const apiUrl = 'https://digiquest-back.herokuapp.com';
    
    try {
        const response = await axios.get(`${apiUrl}/article/${articleId}/comments`);
        const comments = response.data;
        console.log('Commentaires récuperés :', comments);
        return comments;
    } catch (error) {
        console.error('Erreur lors de la récupération des commentaires :', error);
        throw error;
    }
}