import axios from 'axios';

export async function postLogin(username, password) {
    const apiUrl = 'https://digiquest-back.herokuapp.com';

    try {
        const response = await axios.post(`${apiUrl}/login`, {
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