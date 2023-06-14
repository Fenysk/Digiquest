import axios from 'axios';

export async function getIsAdmin() {
    //const apiUrl = 'https://digiquest-back.herokuapp.com';
    const apiUrl = 'http://localhost:3000';
    
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            throw new Error()
        }

        const config = {
            headers: {"Authorization" : `Bearer ${token}`}
        } 
        const response = await axios.get(`${apiUrl}/auth/isAdmin`, config);
        const isAdmin = response.data;
        console.log('isAdmin :', isAdmin);
        return isAdmin;
    } catch (error) {
        console.error('Erreur lors de la récupération des comments :', error);
        throw error;
    }
}