import API from "./axiosInstances";

export const login = (data) => API.post('/login', data);
export const register = (data) => API.post('/register', data);
