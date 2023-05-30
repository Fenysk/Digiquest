import axios from 'axios';

export async function getComments(articleId) {
    const apiUrl = 'https://digiquest-back.herokuapp.com';
    
    try {
        const response = await axios.get(`${apiUrl}/comments`);
        const comments = response.data;
        console.log('Commentaires de l\'articles :', comments);
        const commentsFiltered = comments.filter(comment => comment.articleId === articleId);
        console.log('comments de l\'article filtrés :', commentsFiltered);
        return commentsFiltered;
    } catch (error) {
        console.error('Erreur lors de la récupération des comments :', error);
        throw error;
    }
}