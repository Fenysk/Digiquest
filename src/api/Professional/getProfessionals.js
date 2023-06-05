import axios from 'axios';

export async function getProfessionals() {
    const apiUrl = 'https://digiquest-back.herokuapp.com';
    
    try {
        const response = await axios.get(`${apiUrl}/professionals`);
        const professionals = response.data;
        console.log('Pro récupérés :', professionals);
        return professionals;
    } catch (error) {
        console.error('Erreur lors de la récupération des professionels :', error);
        throw error;
    }
}
