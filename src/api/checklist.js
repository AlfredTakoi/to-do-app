import API from "./axiosInstances";

export const getChecklists = () => API.get('/checklist');
export const getChecklist = (id) => API.get(`/checklist/${id}/item`);
export const createChecklist = (data) => API.post('/checklist', data);
export const deleteChecklist = (id) => API.delete(`/checklist/${id}`);
