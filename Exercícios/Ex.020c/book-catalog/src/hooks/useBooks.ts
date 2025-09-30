// src/hooks/useBooks.ts
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
    setLoading(true); setError(null);
    try {
      const created = await api.addBook(book);
      setBooks(prev => [created, ...prev]);
    } catch (err: any) {
      setError(err?.message || 'Erro ao adicionar livro');
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
    } catch (err: any) {
      setError(err?.message || 'Erro ao remover livro');
    } finally {
      setLoading(false);
    }
  }, []);

  // dentro de useBooks.ts

const toggleStatus = useCallback(async (book: Book) => {
  // 1) Proteção: se não houver _id, sai (evita passar undefined para API)
  if (!book._id) return;

  // 2) Calcula novo status e cria objeto atualizado
  const newStatus = book.status === 'Lido' ? 'Não lido' : 'Lido';
  const updated: Book = { ...book, status: newStatus };

  setLoading(true);
  setError(null);

  try {
    // 3) Use uma variável local para o id (é string garantida pelo guard acima)
    const id = book._id;
    await api.updateBook(id, updated);

    // 4) Atualiza o estado local com segurança
    setBooks(prev => prev.map(b => (b._id === id ? updated : b)));
  } catch (err: unknown) {
    // 5) Tratamento de erro mais seguro: extrai mensagem se possível
    const message = err instanceof Error ? err.message : String(err);
    setError(message || 'Erro ao atualizar status');
  } finally {
    setLoading(false);
  }
}, [setBooks]);
