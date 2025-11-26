// src/api/books.ts
import axios from 'axios';
import type { Book } from '../types/book';

/*
  BASE precisa ter o recurso: .../books
  Ex.: VITE_CRUDCRUD_ENDPOINT=https://crudcrud.com/api/<SUA_CHAVE>/books
*/
const BASE = import.meta.env.VITE_CRUDCRUD_ENDPOINT as string;

if (!BASE) {
  console.warn('VITE_CRUDCRUD_ENDPOINT não encontrado. Configure no .env (ex: https://crudcrud.com/api/<chave>/books)');
}

/**
 * GET all books
 */
export const getBooks = async (): Promise<Book[]> => {
  if (!BASE) throw new Error('VITE_CRUDCRUD_ENDPOINT não configurado');
  const res = await axios.get(BASE);
  return Array.isArray(res.data) ? res.data : [];
};

/**
 * POST new book
 */
export const addBook = async (book: Book): Promise<Book> => {
  const res = await axios.post<Book>(BASE, book);
  return res.data;
};

/**
 * DELETE book by id
 */
export const deleteBook = async (id: string): Promise<void> => {
  await axios.delete(`${BASE}/${id}`);
};

/**
 * PUT update a book by id
 * IMPORTANT: crudcrud expects the object WITHOUT _id in the request body.
 * We'll accept a Partial<Book> (without _id) as `payload`.
 */
export const updateBook = async (id: string, payload: Partial<Omit<Book, '_id'>>): Promise<Book> => {
  const res = await axios.put<Book>(`${BASE}/${id}`, payload);
  return res.data;
};
