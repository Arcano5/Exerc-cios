import axios from 'axios';
import type { Book } from '../types/book';

const BASE = import.meta.env.VITE_CRUDCRUD_ENDPOINT as string;

if (!BASE) {
  console.warn('VITE_CRUDCRUD_ENDPOINT não encontrado. Configure no .env');
}

export const getBooks = async (): Promise<Book[]> => {
  if (!BASE) throw new Error('VITE_CRUDCRUD_ENDPOINT não configurado');
  const res = await axios.get(BASE);
  return Array.isArray(res.data) ? res.data : [];
};

export const addBook = async (book: Book): Promise<Book> => {
  const res = await axios.post<Book>(BASE, book);
  return res.data;
};

export const deleteBook = async (id: string): Promise<void> => {
  await axios.delete(`${BASE}/${id}`);
};

export const updateBook = async (id: string, book: Book): Promise<Book> => {
  const res = await axios.put<Book>(`${BASE}/${id}`, book);
  return res.data;
};
