import axios from "axios";

const api = axios.create({
    baseURL: "http://<Coloque seu endereço de ip>:8080/api",
})

export default api;