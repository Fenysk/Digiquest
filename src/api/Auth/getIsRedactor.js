import axios from 'axios';

export async function getIsRedactor() {
    
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            throw new Error()
        }

        const config = {
            headers: {"Authorization" : `Bearer ${token}`}
        } 
        const response = await axios.get(`${process.env.VUE_APP_API_URL}/auth/isRedactor`, config);
        const isRedactor = response.data;
        console.log('isRedactor :', isRedactor);
        return isRedactor;
    } catch (error) {
        console.error('Erreur lors de la récupération des comments :', error);
        throw error;
    }
}