'use client';

import { useState, useEffect } from 'react';
import { Tarefa, getTarefas } from '../lib/tarefas';

export function useContadorDeTarefas() {
  const [quantidade, setQuantidade] = useState(0);
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);

  useEffect(() => {
    const carregarTarefas = async () => {
      const tarefasCarregadas = await getTarefas();
      setTarefas(tarefasCarregadas);
      setQuantidade(tarefasCarregadas.length);
    };

    carregarTarefas();
  }, []);

  const atualizarContador = (novasTarefas: Tarefa[]) => {
    setTarefas(novasTarefas);
    setQuantidade(novasTarefas.length);
  };

  return {
    quantidade,
    tarefas,
    atualizarContador,
  };
}