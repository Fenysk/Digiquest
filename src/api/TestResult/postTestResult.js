import axios from 'axios';

export async function postTestResult(payload) {

  try {

    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error()
    }

    const config = {
      headers: { "Authorization": `Bearer ${token}` }
    }
    const response = await axios.post(`${process.env.VUE_APP_API_URL}/testResults`, payload, config);
    const result = response.data;
    console.log('Test result créé:', result);
    return result;
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement du test result :', error);
    throw error;
  }
}
