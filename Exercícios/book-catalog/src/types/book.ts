export type BookStatus = 'Lido' | 'Não lido';

export interface Book {
  _id?: string;
  title: string;
  author: string;
  status: BookStatus;
}
