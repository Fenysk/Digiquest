import axios from 'axios';

export async function deletePendingTest(id) {
    
    try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error()
        }

        const config = {
          headers: { "Authorization": `Bearer ${token}` }
        }

        const response = await axios.delete(`${process.env.VUE_APP_API_URL}/pendingTests/${id}`, config);
        const result = response.data;
        console.log('PendingTest supprimé', result);
        return result;
    } catch (error) {
        console.error('Erreur lors de la suppression du pendingTest :', error);
        throw error;
    }
}
