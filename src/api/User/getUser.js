import axios from 'axios';

export async function getUser(accountId) {
    const apiUrl = 'http://localhost:3000';
    
    try {
        const response = await axios.get(`${apiUrl}/user/${accountId}`);
        const user = response.data;
        console.log('Profil récupéré :', user);
        return user;
    } catch (error) {
        console.error('Erreur lors de la récupération du profil :', error);
        throw error;
    }
}
