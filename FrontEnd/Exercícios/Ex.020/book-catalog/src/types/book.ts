// src/types/book.ts
export type BookStatus = 'Lido' | 'Não lido';

export interface Book {
  _id?: string; // criado pelo crudcrud
  title: string;
  author: string;
  status: BookStatus;
}
