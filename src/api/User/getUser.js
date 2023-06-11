import axios from 'axios';

export async function getUser(accountId) {
  const apiUrl = 'https://digiquest-back.herokuapp.com';


  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error()
    }
    const config = {
      headers: { "Authorization": `Bearer ${token}` }
    }
    const response = await axios.get(`${apiUrl}/user/${accountId}`, config);
    const user = response.data;
    console.log('Profil récupéré :', user);
    return user;
  } catch (error) {
    console.error('Erreur lors de la récupération du profil :', error);
    throw error;
  }
}
