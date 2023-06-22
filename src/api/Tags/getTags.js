import axios from 'axios';

export async function getTags() {

    try {
        const response = await axios.get(`${process.env.VUE_APP_API_URL}/tags`);
        console.log(response)
        const tags = response.data;
        return tags;
    } catch (error) {
        console.error('Erreur lors de la récupération des tags :', error);
        throw error;
    }
}
