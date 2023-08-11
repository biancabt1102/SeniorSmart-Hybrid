import axios from "axios";

const api = axios.create({
    baseURL: "http://<Escreva seu IP>:8080/api",
})

export default api;