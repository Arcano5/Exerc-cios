import React from 'react';
import { useSetRecoilState } from 'recoil';
import { todosAtom } from '../atoms/todosAtom';

export default function TodoItem({ todo }) {
  const setTodos = useSetRecoilState(todosAtom);

  const toggle = () => {
    setTodos(prev => prev.map(t => t.id === todo.id ? { ...t, completed: !t.completed } : t));
  };

  const remove = () => {
    setTodos(prev => prev.filter(t => t.id !== todo.id));
  };

  return (
    <li style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: 10, borderRadius: 8, border: '1px solid #eee', marginBottom: 8
    }}>
      <label style={{ display: 'flex', gap: 8, alignItems: 'center', cursor: 'pointer' }}>
        <input type="checkbox" checked={todo.completed} onChange={toggle} />
        <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>{todo.text}</span>
      </label>
      <button onClick={remove} aria-label={`Remover ${todo.text}`} style={{ color: '#e53935', background: 'transparent', border: 'none', cursor: 'pointer' }}>
        Remover
      </button>
    </li>
  );
}
