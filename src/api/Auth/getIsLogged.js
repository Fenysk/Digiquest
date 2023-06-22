import axios from 'axios';

export async function getIsLogged() {

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error()
      }

      const config = {
        headers: {"Authorization" : `Bearer ${token}`}
      }
      const response = await axios.get(`${process.env.VUE_APP_API_URL}/auth/isLogged`, config);
      return;
    } catch (error) {
        throw error;
    }
}