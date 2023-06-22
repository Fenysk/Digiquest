import axios from 'axios';

export async function getAccountPendingTests(id) {

  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error()
    }

    const config = {
      headers: { "Authorization": `Bearer ${token}` }
    }
    const response = await axios.get(`${process.env.VUE_APP_API_URL}/users/${id}/pendingTests`, config);
    const result = response.data;
    console.log('Test results trouvés:', result);
    return result;
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement du test result :', error);
    throw error;
  }
}
