import axios from 'axios';

export async function deleteProfile(userid) {
    const apiUrl = 'https://digiquest-back.herokuapp.com';
    
    try {
        const response = await axios.delete(`${apiUrl}/profile/${userid}`);
        const message = response.data;
        console.log('Message récupéré :', message);
        return message;
    } catch (error) {
        console.error('Erreur lors de la suppression du profil :', error);
        throw error;
    }
}
