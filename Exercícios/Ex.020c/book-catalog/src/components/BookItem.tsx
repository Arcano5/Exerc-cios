// src/components/BookItem.tsx
import type { Book } from '../types/book';

interface Props {
  book: Book;
  onRemove: (id: string) => void;
  onToggle: (book: Book) => void;
}

export default function BookItem({ book, onRemove, onToggle }: Props) {
  return (
    <li style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: 12, borderRadius: 8, border: '1px solid #eee', marginBottom: 8
    }}>
      <div>
        <div style={{ fontWeight: 700 }}>{book.title}</div>
        <div style={{ color: '#555' }}>{book.author}</div>
        <div style={{ marginTop: 6, fontSize: 13 }}>
          <strong>Status:</strong> <span>{book.status}</span>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={() => onToggle(book)} aria-label="Alternar status">
          {book.status === 'Lido' ? 'Marcar como Não lido' : 'Marcar como Lido'}
        </button>
        <button onClick={() => book._id && onRemove(book._id)} style={{ color: '#e53935' }}>
          Remover
        </button>
      </div>
    </li>
  );
}
