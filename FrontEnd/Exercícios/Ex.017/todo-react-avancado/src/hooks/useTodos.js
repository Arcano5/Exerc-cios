import { useCallback } from 'react';
import useLocalStorage from './useLocalStorage';

export default function useTodos() {
  const [todos, setTodos] = useLocalStorage('todos_v1', []);

  const addTodo = useCallback((text) => {
    const newTodo = { id: Date.now().toString(), text, completed: false };
    setTodos(prev => [newTodo, ...prev]);
  }, [setTodos]);

  const toggleTodo = useCallback((id) => {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  }, [setTodos]);

  const removeTodo = useCallback((id) => {
    setTodos(prev => prev.filter(t => t.id !== id));
  }, [setTodos]);

  return { todos, addTodo, toggleTodo, removeTodo };
}
