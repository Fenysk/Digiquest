import axios from 'axios';

export async function postTestResult(payload) {
    const apiUrl = 'https://digiquest-back.herokuapp.com';
    
    try {
        const response = await axios.post(`${apiUrl}/testResult`, payload);
        const result = response.data;
        console.log('Test result créé:', result);
        return result;
    } catch (error) {
        console.error('Erreur lors de l\'enregistrement du test result :', error);
        throw error;
    }
}
