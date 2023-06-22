import axios from 'axios';

export async function patchPendingTest(id, payload) {

  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error()
    }

    const config = {
      headers: { "Authorization": `Bearer ${token}` }
    }

    const response = await axios.patch(`${process.env.VUE_APP_API_URL}/pendingTests/${id}`, payload, config);
    const result = response.data;
    return result;
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement du test interrompu :', error);
    throw error;
  }
}
