// src/App.tsx
import BookForm from './components/BookForm';
import BookList from './components/BookList';
import { useBooks } from './hooks/useBooks';

export default function App() {
  const { books, loading, error, add, remove, toggleStatus, fetchBooks } = useBooks();

  return (
    <div style={{ maxWidth: 900, margin: '24px auto', padding: 16 }}>
      <h1>Catálogo de Livros</h1>

      <section style={{ marginBottom: 24 }}>
        <h2>Adicionar livro</h2>
        <BookForm onAdd={add} />
      </section>

      <section>
        <h2>Livros</h2>
        <BookList books={books} loading={loading} error={error} onRemove={remove} onToggle={toggleStatus} onReload={fetchBooks} />
      </section>
    </div>
  );
}
