import axios from 'axios';

export async function getUser(accountId) {


  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error()
    }
    const config = {
      headers: { "Authorization": `Bearer ${token}` }
    }
    const response = await axios.get(`${process.env.VUE_APP_API_URL}/users/${accountId}`, config);
    const user = response.data;
    console.log('Profil récupéré :', user);
    return user;
  } catch (error) {
    console.error('Erreur lors de la récupération du profil :', error);
    throw error;
  }
}
