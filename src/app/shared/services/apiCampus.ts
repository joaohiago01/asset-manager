import axios from 'axios';

let apiCampus = axios.create({
  baseURL: 'https://dados.ifpb.edu.br/api/3/action',
});

export default apiCampus;
