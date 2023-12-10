import axios from "axios";
const BASE_URL = 'http://localhost:5153';

export default axios.create({
    baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    header: {
        'Content-Type': 'application/json'
    }
});