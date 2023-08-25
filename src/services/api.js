import axios from "axios";

const api = axios.create({
    baseURL: "http://<endereço ip da api>:8080/api",
})

export default api;