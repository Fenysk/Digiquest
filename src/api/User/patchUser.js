import axios from 'axios';

export async function patchUser(accountId, data) {

  try {

    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error()
    }
    const config = {
      headers: { "Authorization": `Bearer ${token}` }
    }

    const {id, ...payload} = data;

    /*
    payload.profile.birthDate = payload.profile.birthDate.slice(0,10);
    console.log('payload: ', payload)
    */

    const response = await axios.patch(
      `${process.env.VUE_APP_API_URL}/users/${accountId}`, 
      payload,
      config
    );
    const message = response.data;
    console.log('Message récupéré :', message);
    return message;
  } catch (error) {
    console.error('Erreur lors de la récupération du profil :', error);
    throw error;
  }
}
