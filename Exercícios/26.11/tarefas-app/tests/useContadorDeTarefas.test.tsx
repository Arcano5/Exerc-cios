import { renderHook, waitFor } from '@testing-library/react';
import { useContadorDeTarefas } from '../hooks/useContadorDeTarefas';

// Mock das funções da API
jest.mock('../lib/tarefas', () => ({
  getTarefas: jest.fn(),
}));

import { getTarefas } from '../lib/tarefas';

describe('useContadorDeTarefas', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve retornar a quantidade correta de tarefas', async () => {
    const mockTarefas = [
      { id: 1, titulo: 'Tarefa 1', concluida: false },
      { id: 2, titulo: 'Tarefa 2', concluida: true },
    ];
    
    (getTarefas as jest.Mock).mockResolvedValue(mockTarefas);

    const { result } = renderHook(() => useContadorDeTarefas());

    // Estado inicial
    expect(result.current.quantidade).toBe(0);
    expect(result.current.tarefas).toEqual([]);

    // Após carregar as tarefas
    await waitFor(() => {
      expect(result.current.quantidade).toBe(2);
    });

    expect(result.current.tarefas).toEqual(mockTarefas);
  });

  it('deve atualizar o contador quando atualizarContador for chamado', async () => {
    const mockTarefas = [
      { id: 1, titulo: 'Tarefa 1', concluida: false },
    ];
    
    (getTarefas as jest.Mock).mockResolvedValue(mockTarefas);

    const { result } = renderHook(() => useContadorDeTarefas());

    await waitFor(() => {
      expect(result.current.quantidade).toBe(1);
    });

    const novasTarefas = [
      ...mockTarefas,
      { id: 2, titulo: 'Nova tarefa', concluida: false },
    ];

    result.current.atualizarContador(novasTarefas);

    expect(result.current.quantidade).toBe(2);
    expect(result.current.tarefas).toEqual(novasTarefas);
  });

  it('deve lidar com lista vazia de tarefas', async () => {
    (getTarefas as jest.Mock).mockResolvedValue([]);

    const { result } = renderHook(() => useContadorDeTarefas());

    await waitFor(() => {
      expect(result.current.quantidade).toBe(0);
    });

    expect(result.current.tarefas).toEqual([]);
  });
});