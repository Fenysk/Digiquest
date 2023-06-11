import axios from 'axios';

export async function getTags() {
    const apiUrl = 'https://digiquest-back.herokuapp.com';
    
    try {
        const response = await axios.get(`${apiUrl}/tags`);
        console.log(response)
        const tags = response.data;
        return tags;
    } catch (error) {
        console.error('Erreur lors de la récupération des tags :', error);
        throw error;
    }
}
