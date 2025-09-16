import React from 'react';
import TodoInput from './components/TodoInput';
import TodoFilters from './components/TodoFilters';
import TodoList from './components/TodoList';

export default function App() {
  return (
    <div style={{ maxWidth: 720, margin: '24px auto', padding: 16 }}>
      <h1>To-Do com Recoil</h1>
      <TodoInput />
      <TodoFilters />
      <TodoList />
    </div>
  );
}
