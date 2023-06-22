import axios from 'axios';

export async function getProfessionals() {
    
    try {
        const response = await axios.get(`${process.env.VUE_APP_API_URL}/professionals`);
        const professionals = response.data;
        console.log('Pro récupérés :', professionals);
        return professionals;
    } catch (error) {
        console.error('Erreur lors de la récupération des professionels :', error);
        throw error;
    }
}
