import axios from 'axios';

export async function getPendingTestResult(id) {

  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error()
    }

    const config = {
      headers: { "Authorization": `Bearer ${token}` }
    }
    const response = await axios.get(`${process.env.VUE_APP_API_URL}/users/${id}/testResults/pending`, config);
    const result = response.data;
    console.log('Pending test trouvés:', result);
    return result;
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement du test result :', error);
    throw error;
  }
}
