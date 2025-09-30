// src/components/BookList.tsx
import BookItem from './BookItem';
import type { Book } from '../types/book';

interface Props {
  books: Book[];
  loading: boolean;
  error: string | null;
  onRemove: (id: string) => void;
  onToggle: (book: Book) => void;
  onReload?: () => void;
}

export default function BookList({ books, loading, error, onRemove, onToggle, onReload }: Props) {
  if (loading) return <p>Carregando livros...</p>;
  if (error) return (
    <div>
      <p style={{ color: 'red' }}>Erro: {error}</p>
      {onReload && <button onClick={onReload}>Tentar novamente</button>}
    </div>
  );
  if (books.length === 0) return <p>Nenhum livro cadastrado.</p>;

  return (
    <ul style={{ padding: 0, listStyle: 'none' }}>
      {books.map(b => <BookItem key={b._id ?? b.title} book={b} onRemove={onRemove} onToggle={onToggle} />)}
    </ul>
  );
}
