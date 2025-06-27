import axios from 'axios';

export const http = axios.create({
  baseURL: 'http://localhost:8000/',
  headers: {
    'Content-type': 'application/json',
  },
});

class ApiService {
  async greet(name: string) {
    return http.post('/api/greet', { name });
  }

  async uploadVideo(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    return http.post('/api/upload_video', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  }

  getVideoUrl(filename: string) {
    return `${http.defaults.baseURL}videos/${filename}`;
  }

  async getModelStatus() {
    return http.get('/api/model/status');
  }

  async predictCsv(csvFilename: string) {
    return http.post('/api/predict_csv', csvFilename, {
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

const apiService = new ApiService();
export default apiService;
