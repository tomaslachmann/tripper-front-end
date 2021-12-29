import axios from "axios";

const API_URL = "http://localhost:4001/post";
 
class PostService {
  
  get(token) {
    let config = {
        headers: {
          'x-access-token': token,
        }
      } 
    return axios
      .get(API_URL,config)
      .then((response) => {
        if (response.data) {
          localStorage.setItem("posts", JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  create(token, post) {
      const headers = {
        'x-access-token': token,
      }

    return axios
      .post(API_URL + "/create", { post }, { headers: headers })
      .then((response) => {
        return response.data;
      });
  }
}

export default new PostService();