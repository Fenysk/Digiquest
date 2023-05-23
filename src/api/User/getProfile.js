import axios from 'axios';

export async function getProfile(profileId) {
    const apiUrl = 'https://digiquest-back.herokuapp.com';
    
    try {
        const response = await axios.get(`${apiUrl}/profile/${profileId}`);
        const profile = response.data;
        console.log('Profil récupéré :', profile);
        return profile;
    } catch (error) {
        console.error('Erreur lors de la récupération du profil :', error);
        throw error;
    }
}
