import axios from 'axios';

export async function postArticle(payload) {

  try {

    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error()
    }
    const config = {
      headers: { "Authorization": `Bearer ${token}` }
    }

    const response = await axios.post(`${process.env.VUE_APP_API_URL}/articles`, payload, config);
    const message = response.data;
    console.log('Message récupéré :', message);
    return message;
  } catch (error) {
    console.error('Erreur lors de la récupération du token :', error);
    throw error.response;
  }
}