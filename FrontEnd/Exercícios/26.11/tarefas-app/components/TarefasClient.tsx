'use client';


import React from 'react';


import { Tarefa } from '../lib/tarefas';
import ListaTarefas from './ListaTarefas';
import NovaTarefa from './NovaTarefa';
import { useContadorDeTarefas } from '../hooks/useContadorDeTarefas';

interface TarefasClientProps {
  tarefasIniciais: Tarefa[];
}

export default function TarefasClient({ tarefasIniciais }: TarefasClientProps) {
  const { quantidade, tarefas, atualizarContador } = useContadorDeTarefas();

  // Inicializar com as tarefas do server side
  React.useEffect(() => {
    if (tarefasIniciais && tarefasIniciais.length > 0 && tarefas.length === 0) {
      atualizarContador(tarefasIniciais);
    }
  }, [tarefasIniciais, tarefas.length, atualizarContador]);

  const handleTarefaAdicionada = (novaTarefa: Tarefa) => {
    atualizarContador([...tarefas, novaTarefa]);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Lista de Tarefas
        </h1>
        
        <div className="mb-6">
          <p className="text-lg text-gray-600">
            Total de tarefas: <span className="font-semibold">{quantidade}</span>
          </p>
        </div>

        <NovaTarefa onTarefaAdicionada={handleTarefaAdicionada} />
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Suas Tarefas</h2>
          <ListaTarefas tarefas={tarefas} />
        </div>
      </div>
    </div>
  );
}