import axios from "axios";

const api = axios.create({
    baseURL: "http://<Seu ip>:8080/api",
})

export default api;