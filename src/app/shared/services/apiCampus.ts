import axios from "axios";

let apiCampus = axios.create({
  baseURL: 'https://dados.ifpb.edu.br/dataset/4edc20c5-bf7d-43a3-bb00-8669ddf1cc4d/resource/7841787a-8e9d-4a93-b9ed-2d583057b9a0/download/patrimonio-2019.json'
});

export default apiCampus;
