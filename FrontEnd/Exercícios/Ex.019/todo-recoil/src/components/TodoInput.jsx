import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { todosAtom } from '../atoms/todosAtom';

export default function TodoInput() {
  const [text, setText] = useState('');
  const setTodos = useSetRecoilState(todosAtom);

  const handleAdd = (e) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;

    const newTodo = { id: Date.now().toString(), text: trimmed, completed: false };
    setTodos(prev => [newTodo, ...prev]);
    setText('');
  };

  return (
    <form onSubmit={handleAdd} style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Adicionar tarefa..."
        style={{ flex: 1, padding: 8, borderRadius: 6, border: '1px solid #ccc' }}
      />
      <button type="submit" style={{ padding: '8px 12px', borderRadius: 6 }}>
        Adicionar
      </button>
    </form>
  );
}
