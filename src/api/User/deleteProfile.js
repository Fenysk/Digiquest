import axios from 'axios';

export async function deleteProfile(userid) {
    
    try {
        const response = await axios.delete(`${process.env.VUE_APP_API_URL}/users/${userid}`);
        const message = response.data;
        console.log('Message récupéré :', message);
        return message;
    } catch (error) {
        console.error('Erreur lors de la suppression du profil :', error);
        throw error;
    }
}
