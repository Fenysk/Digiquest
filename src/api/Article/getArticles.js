import axios from 'axios';

export async function getArticles() {
    
    try {
        const response = await axios.get(`${process.env.VUE_APP_API_URL}/articles`);
        const articles = response.data;
        console.log('Articles récupérés :', articles);
        return articles;
    } catch (error) {
        console.error('Erreur lors de la récupération des articles :', error);
        throw error;
    }
}
