import axios from 'axios';

export async function postUser(payload) {

    try {
        const response = await axios.post(`${process.env.VUE_APP_API_URL}/users`, payload);
        const message = response.data;
        console.log('Message récupéré :', message);
        return message;
    } catch (error) {
        console.error('Erreur lors de la récupération du token :', error);
        throw error.response;
    }
}