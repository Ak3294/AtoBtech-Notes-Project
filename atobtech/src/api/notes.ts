import axios from 'axios';
import { Note } from '../types';

const API_URL = 'http://localhost:5000/api';

export const getNotes = async (search?: string, subject?: string) => {
  const params = new URLSearchParams();
  if (search) params.append('search', search);
  if (subject && subject !== 'all') params.append('subject', subject);
  
  const response = await axios.get<Note[]>(`${API_URL}/notes`, { params });
  return response.data;
};

export const getNoteById = async (id: string) => {
  const response = await axios.get<Note>(`${API_URL}/notes/${id}`);
  return response.data;
};

export const createNote = async (note: Omit<Note, 'id' | 'createdAt'>) => {
  const response = await axios.post<Note>(`${API_URL}/notes`, note);
  return response.data;
};

export const updateNote = async (id: string, note: Partial<Note>) => {
  const response = await axios.patch<Note>(`${API_URL}/notes/${id}`, note);
  return response.data;
};

export const deleteNote = async (id: string) => {
  await axios.delete(`${API_URL}/notes/${id}`);
};