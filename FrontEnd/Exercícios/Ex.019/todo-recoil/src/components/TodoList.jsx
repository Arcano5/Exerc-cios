import React from 'react';
import { useRecoilValue } from 'recoil';
import { filteredTodosSelector } from '../selectors/filteredTodosSelector';
import TodoItem from './TodoItem';

export default function TodoList() {
  const todos = useRecoilValue(filteredTodosSelector);

  if (todos.length === 0) return <p style={{ color: '#666' }}>Nenhuma tarefa.</p>;

  return (
    <ul style={{ padding: 0, listStyle: 'none', margin: 0 }}>
      {todos.map(t => <TodoItem key={t.id} todo={t} />)}
    </ul>
  );
}
