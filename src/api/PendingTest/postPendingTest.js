import axios from 'axios';

export async function postPendingTest(payload) {
    const apiUrl = 'https://digiquest-back.herokuapp.com';
    
    try {
        const response = await axios.post(`${apiUrl}/pendingTest`, payload);
        const result = response.data;
        return result;
    } catch (error) {
        console.error('Erreur lors de l\'enregistrement du test result :', error);
        throw error;
    }
}
