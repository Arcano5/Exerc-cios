import React from 'react';
import { useTodoContext } from '../context/TodoContext';

const TodoFilters = React.memo(function TodoFilters() {
  const { filter, setFilter, counts } = useTodoContext();
  console.log('Render TodoFilters');

  return (
    <div className="filters">
      <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>
        Todas ({counts.total})
      </button>
      <button className={filter === 'pending' ? 'active' : ''} onClick={() => setFilter('pending')}>
        Pendentes ({counts.pending})
      </button>
      <button className={filter === 'completed' ? 'active' : ''} onClick={() => setFilter('completed')}>
        Concluídas ({counts.completed})
      </button>
    </div>
  );
});

export default TodoFilters;
