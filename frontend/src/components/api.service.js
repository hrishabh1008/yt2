// api.service.js
import axios from "axios";
 

const BACKEND_URL = "http://localhost:9999"//change the the URL according to the backend server hosting

//creating instance of axios with custom config
const api = axios.create({
  baseURL: BACKEND_URL, 
});
// console.log(api)
export default api;
