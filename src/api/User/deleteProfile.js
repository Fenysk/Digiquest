import axios from 'axios';

export async function deleteProfile(profileId) {
    const apiUrl = 'https://digiquest-back.herokuapp.com';
    
    try {
        const response = await axios.delete(`${apiUrl}/profile/${profileId}`);
        const message = response.data;
        console.log('Message récupéré :', message);
        return message;
    } catch (error) {
        console.error('Erreur lors de la récupération du profil :', error);
        throw error;
    }
}
