import { useState } from 'react';
import type { Book, BookStatus } from '../types/book';

interface Props {
  onAdd: (book: Book) => Promise<void>;
}

const initialState = {
  title: '',
  author: '',
  status: 'Não lido' as BookStatus,
};

export default function BookForm({ onAdd }: Props) {
  const [title, setTitle] = useState(initialState.title);
  const [author, setAuthor] = useState(initialState.author);
  const [status, setStatus] = useState<BookStatus>(initialState.status);
  const [submitting, setSubmitting] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    if (!title.trim() || !author.trim()) {
      setLocalError('Título e autor são obrigatórios.');
      return;
    }
    const book: Book = { title: title.trim(), author: author.trim(), status };
    try {
      setSubmitting(true);
      await onAdd(book);
      setTitle(''); setAuthor(''); setStatus('Não lido');
    } catch {
      setLocalError('Falha ao adicionar. Tente novamente.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 16 }}>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Título" style={{ padding: 8, minWidth: 200 }} />
        <input value={author} onChange={e => setAuthor(e.target.value)} placeholder="Autor" style={{ padding: 8, minWidth: 200 }} />
        <select value={status} onChange={e => setStatus(e.target.value as BookStatus)}>
          <option value="Não lido">Não lido</option>
          <option value="Lido">Lido</option>
        </select>
        <button type="submit" disabled={submitting} style={{ padding: '8px 12px' }}>
          {submitting ? 'Adicionando...' : 'Adicionar'}
        </button>
      </div>

      {localError && <p style={{ color: 'red', marginTop: 8 }}>{localError}</p>}
    </form>
  );
}
