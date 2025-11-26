export useBooks from './useBooks'

// dentro de useBooks.ts (substitua a função toggleStatus atual)
const toggleStatus = useCallback(async (book: Book) => {
  if (!book._id) return;

  const id = book._id;
  const newStatus = book.status === 'Lido' ? 'Não lido' : 'Lido';

  // updated contains the new state including _id (kept for local UI)
  const updated: Book = { ...book, status: newStatus };

  // payload que será enviado ao servidor: NÃO incluir _id (crudcrud exige)
  const { _id, ...payload } = updated; // payload é { title, author, status }

  setLoading(true);
  setError(null);

  try {
    // envia apenas payload (sem _id)
    await api.updateBook(id, payload);
    // atualiza estado local com o objeto completo (mantendo _id)
    setBooks(prev => prev.map(b => (b._id === id ? updated : b)));
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    setError(message || 'Erro ao atualizar status');
  } finally {
    setLoading(false);
  }
}, [setBooks]);
