// src/hooks/useBooks.ts
import { useCallback, useEffect, useState } from 'react';
import { Book } from '../types/book';
import * as api from '../api/books';

export function useBooks() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBooks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getBooks();
      setBooks(data);
    } catch (err: any) {
      setError(err?.message || 'Erro ao buscar livros');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const add = useCallback(async (book: Book) => {
    setLoading(true);
    setError(null);
    try {
      const created = await api.addBook(book);
      // o created vem com _id do crudcrud
      setBooks(prev => [created, ...prev]);
    } catch (err: any) {
      setError(err?.message || 'Erro ao adicionar livro');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const remove = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await api.deleteBook(id);
      setBooks(prev => prev.filter(b => b._id !== id));
    } catch (err: any) {
      setError(err?.message || 'Erro ao remover livro');
    } finally {
      setLoading(false);
    }
  }, []);

  const toggleStatus = useCallback(async (book: Book) => {
    if (!book._id) return;
    setLoading(true);
    setError(null);
    try {
      const newStatus = book.status === 'Lido' ? 'Não lido' : 'Lido';
      const updated = { ...book, status: newStatus };
      await api.updateBook(book._id, updated);
      setBooks(prev => prev.map(b => (b._id === book._id ? updated : b)));
    } catch (err: any) {
      setError(err?.message || 'Erro ao atualizar status');
    } finally {
      setLoading(false);
    }
  }, []);

  return { books, loading, error, fetchBooks, add, remove, toggleStatus };
}
