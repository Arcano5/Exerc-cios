import React, { createContext, useContext, useState, useMemo } from 'react';
import useTodos from '../hooks/useTodos';

const TodoContext = createContext();

export function TodoProvider({ children }) {
  const { todos, addTodo, toggleTodo, removeTodo } = useTodos();
  const [filter, setFilter] = useState('all'); // 'all' | 'completed' | 'pending'

  // Filtragem memoizada (evita recalcular a lista sem necessidade)
  const filteredTodos = useMemo(() => {
    console.log('Calculando filteredTodos');
    switch (filter) {
      case 'completed': return todos.filter(t => t.completed);
      case 'pending': return todos.filter(t => !t.completed);
      default: return todos;
    }
  }, [todos, filter]);

  const counts = useMemo(() => ({
    total: todos.length,
    completed: todos.filter(t => t.completed).length,
    pending: todos.filter(t => !t.completed).length,
  }), [todos]);

  const value = useMemo(() => ({
    todos, addTodo, toggleTodo, removeTodo,
    filter, setFilter, filteredTodos, counts
  }), [todos, addTodo, toggleTodo, removeTodo, filter, filteredTodos, counts]);

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}

export const useTodoContext = () => {
  const ctx = useContext(TodoContext);
  if (!ctx) throw new Error('useTodoContext must be used within TodoProvider');
  return ctx;
};
