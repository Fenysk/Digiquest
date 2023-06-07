import axios from 'axios';

export async function patchPendingTest(id, payload) {
  const apiUrl = 'https://digiquest-back.herokuapp.com';
    
    try {
        const response = await axios.patch(`${apiUrl}/pendingTest/${id}`, payload);
        const result = response.data;
        return result;
    } catch (error) {
        console.error('Erreur lors de l\'enregistrement du test interrompu :', error);
        throw error;
    }
}
