import axios from 'axios';

export async function postComment(
    accountId,
    articleId,
    content,
) {
    const apiUrl = 'https://digiquest-back.herokuapp.com';

    try {
        const response = await axios.post(`${apiUrl}/user`, {
            accountId,
            articleId,
            content,
        });
        const comment = response.data;
        console.log('Réponse du backend :', comment);
        return comment;
    } catch (error) {
        console.error('Erreur lors de la récupération du token :', error);
        throw error.response;
    }
}