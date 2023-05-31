import axios from 'axios';

export async function getComments(articleId) {
    const apiUrl = 'https://digiquest-back.herokuapp.com';
    
    try {
        const response = await axios.get(`${apiUrl}/article/${articleId}/comments`);
        const comments = response.data;
        console.log('Commentaires de l\'articles :', comments);
        return comments;
    } catch (error) {
        console.error('Erreur lors de la récupération des comments :', error);
        throw error;
    }
}