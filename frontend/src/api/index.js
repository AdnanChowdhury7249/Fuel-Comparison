import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/"
});

export const getCompare = (postcode) => API.get(`/compare?postcode=${postcode}`);
