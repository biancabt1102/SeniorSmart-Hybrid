import axios from "axios";

const api = axios.create({
    baseURL: "http://<ENDEREÇO DA API>:8080/api",
})

export default api;