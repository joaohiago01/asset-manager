import axios from "axios";

let api = axios.create({
  baseURL: 'http://localhost:8081'
});

export default api;
