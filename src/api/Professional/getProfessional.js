import axios from 'axios';

export async function getProfessional(articleId) {
    
    try {
        const response = await axios.get(`${process.env.VUE_APP_API_URL}/professionals/${articleId}`);
        const professional = response.data;
        console.log('Professional récupéré :', professional);
        return professional;
    } catch (error) {
        console.error('Erreur lors de la récupération de professionnel :', error);
        throw error;
    }
}