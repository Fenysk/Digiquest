import axios from 'axios';

export async function postPendingTest(payload) {

  try {

    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error()
    }

    const config = {
      headers: { "Authorization": `Bearer ${token}` }
    }
    const response = await axios.post(`${process.env.VUE_APP_API_URL}/pendingTests`, payload, config);
    const result = response.data;
    return result;
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement du test result :', error);
    throw error;
  }
}
