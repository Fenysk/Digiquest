import axios from 'axios';

export async function getIsLogged() {
    const apiUrl = 'https://digiquest-back.herokuapp.com';

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error()
      }

      const config = {
        headers: {"Authorization" : `Bearer ${token}`}
      }
      const response = await axios.get(`${apiUrl}/auth/isLogged`, config);
      return;
    } catch (error) {
        throw error;
    }
}