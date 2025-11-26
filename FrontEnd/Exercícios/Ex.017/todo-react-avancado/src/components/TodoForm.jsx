import React from 'react';
import { useTodoContext } from '../context/TodoContext';
import useInput from '../hooks/useInput';

export default function TodoForm() {
  const { addTodo } = useTodoContext();
  const { value, onChange, reset } = useInput('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value.trim()) return;
    addTodo(value.trim());
    reset();
  };

  console.log('Render TodoForm');

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        value={value}
        onChange={onChange}
        placeholder="Nova tarefa..."
        aria-label="Nova tarefa"
      />
      <button type="submit">Adicionar</button>
    </form>
  );
}
