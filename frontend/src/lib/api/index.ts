import axios from "axios";
import { addAutherizationHeader } from "./interceptors/request";

const baseURL = import.meta.env.VITE_API_URL;
const api = axios.create({ baseURL });
api.defaults.headers.common['Content-Type'] = 'application/json';
api.interceptors.request.use(addAutherizationHeader);

export default api;
