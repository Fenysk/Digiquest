import axios from 'axios';

export async function getIsAdmin(token) {
    const apiUrl = 'https://digiquest-back.herokuapp.com';
    
    try {
        const response = await axios.get(`${apiUrl}/auth/isAdmin`, {
            headers: {
                Authorization: `${token}`,
            },
        });
        const isAdmin = response.data;
        console.log('isAdmin :', isAdmin);
        return isAdmin;
    } catch (error) {
        console.error('Erreur lors de la récupération des comments :', error);
        throw error;
    }
}