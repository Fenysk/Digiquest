import axios from 'axios';

export async function getAccountPendingTests(id) {
    const apiUrl = 'https://digiquest-back.herokuapp.com';
    
    try {
        const response = await axios.get(`${apiUrl}/account/${id}/pendingTests`);
        const result = response.data;
        console.log('Test results trouvés:', result);
        return result;
    } catch (error) {
        console.error('Erreur lors de l\'enregistrement du test result :', error);
        throw error;
    }
}
