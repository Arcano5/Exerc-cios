import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { filterAtom } from '../atoms/filterAtom';
import { todosAtom } from '../atoms/todosAtom';

export default function TodoFilters() {
  const [filter, setFilter] = useRecoilState(filterAtom);
  const todos = useRecoilValue(todosAtom);

  const counts = {
    total: todos.length,
    completed: todos.filter(t => t.completed).length,
    pending: todos.filter(t => !t.completed).length,
  };

  return (
    <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
      <button onClick={() => setFilter('all')} className={filter === 'all' ? 'active' : ''}>
        Todas ({counts.total})
      </button>
      <button onClick={() => setFilter('pending')} className={filter === 'pending' ? 'active' : ''}>
        Pendentes ({counts.pending})
      </button>
      <button onClick={() => setFilter('completed')} className={filter === 'completed' ? 'active' : ''}>
        Concluídas ({counts.completed})
      </button>

      <style>{`
        button {
          padding: 6px 10px;
          border-radius: 8px;
          border: 1px solid #ddd;
          background: transparent;
          cursor: pointer;
        }
        button.active {
          background: #111;
          color: #fff;
          border-color: #111;
        }
      `}</style>
    </div>
  );
}
