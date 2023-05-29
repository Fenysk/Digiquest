import axios from 'axios';

export async function postUser(
    username,
    password,
    email,
    firstName,
    lastName,
    birthDate,
) {
    const apiUrl = 'https://digiquest-back.herokuapp.com';

    try {
        const response = await axios.post(`${apiUrl}/user`, {
            username,
            password,
            email,
            firstName,
            lastName,
            birthDate,
        });
        const message = response.data;
        console.log('Message récupéré :', message);
        return message;
    } catch (error) {
        console.error('Erreur lors de la récupération du token :', error);
        throw error.response;
    }
}