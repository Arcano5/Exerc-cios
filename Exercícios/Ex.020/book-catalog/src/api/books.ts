// src/api/books.ts
import axios from 'axios';
import { Book } from '../types/book';

const BASE = import.meta.env.VITE_CRUDCRUD_ENDPOINT as string;

if (!BASE) {
  console.warn('VITE_CRUDCRUD_ENDPOINT não encontrado. Configure no .env');
}

export const getBooks = async (): Promise<Book[]> => {
  const res = await axios.get<Book[]>(BASE);
  return res.data;
};

export const addBook = async (book: Book): Promise<Book> => {
  const res = await axios.post<Book>(BASE, book);
  return res.data;
};

export const deleteBook = async (id: string): Promise<void> => {
  await axios.delete(`${BASE}/${id}`);
};

export const updateBook = async (id: string, book: Book): Promise<Book> => {
  // crudcrud espera o objeto inteiro no PUT
  const res = await axios.put<Book>(`${BASE}/${id}`, book);
  return res.data;
};
