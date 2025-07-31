import API from "./axiosInstances";

export const createItem = (checklistId, data) => API.post(`/checklist/${checklistId}/item`, data);
export const getItems = (checklistId, data) => API.get(`/checklist/${checklistId}/item`, data);
export const getItem = (checklistId, id) => API.get(`/checklist/${checklistId}/item/${id}`);
export const updateItem = (checklistId, id, data) => API.put(`/checklist/${checklistId}/item/rename/${id}`, data);
export const toggleItemStatus = (checklistId, id, data) => API.put(`/checklist/${checklistId}/item/${id}`, {data});
export const deleteItem = (checklistId, id, data) => API.delete(`/checklist/${checklistId}/item/${id}`, {data});