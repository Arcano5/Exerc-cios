import React from 'react';
import { useTodoContext } from '../context/TodoContext';
import TodoItem from './TodoItem';

const TodoList = React.memo(function TodoList() {
  const { filteredTodos } = useTodoContext();
  console.log('Render TodoList');

  if (filteredTodos.length === 0) return <p className="empty">Nenhuma tarefa.</p>;

  return (
    <ul className="todo-list">
      {filteredTodos.map(todo => <TodoItem key={todo.id} todo={todo} />)}
    </ul>
  );
});

export default TodoList;
