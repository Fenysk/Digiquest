import axios from 'axios';

export async function postComment(
  accountId,
  articleId,
  content,
) {

  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error()
    }

    const config = {
      headers: { "Authorization": `Bearer ${token}` }
    }

    const response = await axios.post(`${process.env.VUE_APP_API_URL}/comments`, 
      {
        accountId,
        articleId,
        content,
      },
      config
    );
    const comment = response.data;
    console.log('Réponse du backend :', comment);
    return comment;
  } catch (error) {
    console.error('Erreur lors de la récupération du token :', error);
    throw error.response;
  }
}