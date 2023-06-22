import axios from 'axios';

export async function postLogin(username, password) {

    try {
        const response = await axios.post(`${process.env.VUE_APP_API_URL}/auth/login`, {
            username,
            password
        });
        const token = response.data.token;
        return token;
    } catch (error) {
        console.error('Erreur lors de la récupération du token :', error);
        throw error;
    }
}