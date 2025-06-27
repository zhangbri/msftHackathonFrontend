import axios from 'axios';

export const http = axios.create({
  baseURL: 'http://alg0run.xyz:3001/api',
  headers: {
    'Content-type': 'application/json',
  },
});

class ApiService {
  async sendVideo() {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return null;
    return await http.post('TODO');
  }
}

const apiService = new ApiService();
export default apiService;
