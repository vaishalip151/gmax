import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3001',
});

export const getUsers = (params: any) => API.get('/users', { params });
export const createUser = (data: any) => API.post('/users', data);
export const updateUser = (id: number, data: any) => API.put(`/users/${id}`, data);
export const deleteUser = (id: number) => API.delete(`/users/${id}`);
