import { useCallback, useEffect, useState } from 'react';
import type { Book } from '../types/book';
import * as api from '../api/books';

export function useBooks() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBooks = useCallback(async () => {
    setLoading(true); setError(null);
    try {
      const data = await api.getBooks();
      setBooks(Array.isArray(data) ? data : []);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message || 'Erro ao buscar livros');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchBooks();
  }, [fetchBooks]);

  const add = useCallback(async (book: Book) => {
    setLoading(true); setError(null);
    try {
      const created = await api.addBook(book);
      setBooks(prev => [created, ...prev]);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message || 'Erro ao adicionar livro');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const remove = useCallback(async (id: string) => {
    setLoading(true); setError(null);
    try {
      await api.deleteBook(id);
      setBooks(prev => prev.filter(b => b._id !== id));
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message || 'Erro ao remover livro');
    } finally {
      setLoading(false);
    }
  }, []);

  const toggleStatus = useCallback(async (book: Book) => {
    if (!book._id) return;
    const newStatus = book.status === 'Lido' ? 'Não lido' : 'Lido';
    const updated: Book = { ...book, status: newStatus };

    setLoading(true); setError(null);
    try {
      const id = book._id;
      await api.updateBook(id, updated);
      setBooks(prev => prev.map(b => (b._id === id ? updated : b)));
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message || 'Erro ao atualizar status');
    } finally {
      setLoading(false);
    }
  }, []);

  return { books, loading, error, fetchBooks, add, remove, toggleStatus };
}
