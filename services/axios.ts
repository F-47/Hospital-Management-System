import axios from "axios";

const baseURL = "https://hospital-api.up.railway.app";

export const adminAPI = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});
