import axios from 'axios';

export async function patchTestResult(id, payload) {

  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error()
    }

    const config = {
      headers: { "Authorization": `Bearer ${token}` }
    }

    const response = await axios.patch(`${process.env.VUE_APP_API_URL}/testResults/${id}`, payload, config);
    const result = response.data;
    return result;
  } catch (error) {
    console.error('Erreur lors de la mise à jour du test:', error);
    throw error;
  }
}
