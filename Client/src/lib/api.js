import axios from "axios";
import { API_BASE_URL } from "../config";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export const getProjects = () => api.get("/api/projects");
export const getSkills = () => api.get("/api/skills");
export const getExperiences = () => api.get("/api/experiences");
export const getResume = () => api.get("/api/resume");
export const sendContact = (data) => api.post("/api/contact", data);

export default api;
