'use client';

import { useState, FormEvent } from 'react';
import { addTarefa } from '../lib/tarefas';
import { Tarefa } from '../lib/tarefas';

interface NovaTarefaProps {
  onTarefaAdicionada: (novaTarefa: Tarefa) => void;
}

export default function NovaTarefa({ onTarefaAdicionada }: NovaTarefaProps) {
  const [titulo, setTitulo] = useState('');
  const [enviando, setEnviando] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!titulo.trim()) {
      alert('Por favor, digite um título para a tarefa');
      return;
    }

    setEnviando(true);
    
    try {
      const novaTarefa = await addTarefa(titulo.trim());
      setTitulo('');
      onTarefaAdicionada(novaTarefa);
    } catch (error) {
      console.error('Erro ao adicionar tarefa:', error);
      alert('Erro ao adicionar tarefa');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex gap-2">
        <input
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Digite uma nova tarefa..."
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={enviando}
        />
        <button
          type="submit"
          disabled={enviando || !titulo.trim()}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {enviando ? 'Adicionando...' : 'Adicionar'}
        </button>
      </div>
    </form>
  );
}