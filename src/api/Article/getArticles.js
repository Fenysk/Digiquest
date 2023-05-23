import axios from 'axios';

export async function getArticles() {
    const apiUrl = 'https://digiquest-back.herokuapp.com';
    
    try {
        const response = await axios.get(`${apiUrl}/articles`);
        const articles = response.data;
        console.log('Articles récupérés :', articles);
        return articles;
    } catch (error) {
        console.error('Erreur lors de la récupération des articles :', error);
        throw error;
    }
}
