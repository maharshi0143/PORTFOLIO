import axios from "axios";
import { API_BASE_URL } from "../config";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/admin/login";
    }
    return Promise.reject(error);
  }
);

export const login = (email, password) =>
  api.post("/api/auth/login", { email, password });

export const getProjects = () => api.get("/api/projects");
export const createProject = (data) => api.post("/api/projects", data);
export const updateProject = (id, data) => api.put(`/api/projects/${id}`, data);
export const deleteProject = (id) => api.delete(`/api/projects/${id}`);

export const getSkills = () => api.get("/api/skills");
export const createSkill = (data) => api.post("/api/skills", data);
export const updateSkill = (id, data) => api.put(`/api/skills/${id}`, data);
export const deleteSkill = (id) => api.delete(`/api/skills/${id}`);

export const getExperiences = () => api.get("/api/experiences");
export const createExperience = (data) => api.post("/api/experiences", data);
export const updateExperience = (id, data) => api.put(`/api/experiences/${id}`, data);
export const deleteExperience = (id) => api.delete(`/api/experiences/${id}`);

export const getResume = () => api.get("/api/resume");
export const updateResume = (resume_url) => api.put("/api/resume", { resume_url });

export const getMessages = () => api.get("/api/contact");
export const deleteMessage = (id) => api.delete(`/api/contact/${id}`);

export default api;
