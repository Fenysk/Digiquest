import axios from 'axios';

export async function getProfessional(articleId) {
    const apiUrl = 'https://digiquest-back.herokuapp.com';
    
    try {
        const response = await axios.get(`${apiUrl}/professional/${articleId}`);
        const professional = response.data;
        console.log('Professional récupéré :', professional);
        return professional;
    } catch (error) {
        console.error('Erreur lors de la récupération de professionnel :', error);
        throw error;
    }
}