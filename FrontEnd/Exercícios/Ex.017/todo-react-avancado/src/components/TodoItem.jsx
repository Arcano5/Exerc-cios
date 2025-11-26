import React from 'react';
import { useTodoContext } from '../context/TodoContext';

const TodoItem = React.memo(function TodoItem({ todo }) {
  const { toggleTodo, removeTodo } = useTodoContext();
  console.log('Render TodoItem', todo.id);

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <label>
        <input type="checkbox" checked={todo.completed} onChange={() => toggleTodo(todo.id)} />
        <span>{todo.text}</span>
      </label>
      <button className="remove" onClick={() => removeTodo(todo.id)} aria-label={`Remover ${todo.text}`}>
        Remover
      </button>
    </li>
  );
});

export default TodoItem;
