import axios from 'axios';

export async function deletePendingTest(id) {
    const apiUrl = 'https://digiquest-back.herokuapp.com';
    
    try {
        const response = await axios.delete(`${apiUrl}/pendingTest/${id}`);
        const result = response.data;
        console.log('PendingTest supprimé', result);
        return result;
    } catch (error) {
        console.error('Erreur lors de la suppression du pendingTest :', error);
        throw error;
    }
}
