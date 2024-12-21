import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://miraculousmvp.com/api" // Production URL remove api
    : "http://localhost:3000/api";   // Development URL

const apiClient = axios.create({
  baseURL,
});

export default apiClient;
