import API from "./axiosInstances";

export const createItem = (checklistId, data) => API.post(`/checklist/${checklistId}/item`, data);
export const getItems = (checklistId, data) => API.get(`/checklist/${checklistId}/item`, data);
export const getItem = (id) => API.get(`/items/${id}`);
export const updateItem = (id, data) => API.put(`/items/${id}`, data);
export const toggleItemStatus = (id) => API.patch(`/items/${id}/toggle`);
export const deleteItem = (checklistId, id, data) => API.delete(`/checklist/${checklistId}/item/${id}`, {data});