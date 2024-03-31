import axios from "axios";


//const BASE_URL = 'http://localhost:3001/api/v1';
const BASE_URL = 'https://airbnb-clone-backend-v2n1.onrender.com';
export const axiosPrivate = axios.create(
  {baseURL: BASE_URL,
  headers: {'Content-Type': 'application/json'},
  withCredentials: true}
)


export const axiosNormal = axios.create(
  {baseURL: BASE_URL,
    headers: {'Content-Type': 'application/json'},
    withCredentials: true}
)