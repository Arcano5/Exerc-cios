import { render, screen } from '@testing-library/react';
import Home from '../app/page';

// Mock das funções
jest.mock('../lib/tarefas', () => ({
  getTarefas: jest.fn(),
}));

import { getTarefas } from '../lib/tarefas';

// Mock do Client Component
jest.mock('../components/TarefasClient', () => {
  return function MockTarefasClient({ tarefasIniciais }: { tarefasIniciais: any[] }) {
    return (
      <div>
        <h1>Lista de Tarefas</h1>
        <div>Total de tarefas: <span>{tarefasIniciais.length}</span></div>
        <div>
          {tarefasIniciais.map(tarefa => (
            <div key={tarefa.id}>{tarefa.titulo}</div>
          ))}
        </div>
      </div>
    );
  };
});

describe('Página Home', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve renderizar a página com tarefas', async () => {
    const mockTarefas = [
      { id: 1, titulo: 'Estudar Next.js', concluida: false },
      { id: 2, titulo: 'Fazer testes', concluida: true },
    ];

    (getTarefas as jest.Mock).mockResolvedValue(mockTarefas);

    const Page = await Home();
    render(Page);

    expect(screen.getByText('Lista de Tarefas')).toBeInTheDocument();
    expect(screen.getByText('Total de tarefas:')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('Estudar Next.js')).toBeInTheDocument();
    expect(screen.getByText('Fazer testes')).toBeInTheDocument();
  });

  it('deve lidar com lista vazia', async () => {
    (getTarefas as jest.Mock).mockResolvedValue([]);

    const Page = await Home();
    render(Page);

    expect(screen.getByText('Total de tarefas:')).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();
  });
});