import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NovaTarefa from '../components/NovaTarefa';

// Mock das funções da API
jest.mock('../lib/tarefas', () => ({
  addTarefa: jest.fn(),
}));

import { addTarefa } from '../lib/tarefas';

const mockOnTarefaAdicionada = jest.fn();

describe('NovaTarefa', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve renderizar o formulário corretamente', () => {
    render(<NovaTarefa onTarefaAdicionada={mockOnTarefaAdicionada} />);

    expect(screen.getByPlaceholderText('Digite uma nova tarefa...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Adicionar' })).toBeInTheDocument();
  });

  it('deve atualizar o input quando o usuário digitar', async () => {
    const user = userEvent.setup();
    render(<NovaTarefa onTarefaAdicionada={mockOnTarefaAdicionada} />);

    const input = screen.getByPlaceholderText('Digite uma nova tarefa...');
    await user.type(input, 'Nova tarefa de teste');

    expect(input).toHaveValue('Nova tarefa de teste');
  });

  it('não deve submeter o formulário com input vazio', async () => {
    const user = userEvent.setup();
    render(<NovaTarefa onTarefaAdicionada={mockOnTarefaAdicionada} />);

    const button = screen.getByRole('button', { name: 'Adicionar' });
    await user.click(button);

    expect(addTarefa).not.toHaveBeenCalled();
    expect(mockOnTarefaAdicionada).not.toHaveBeenCalled();
  });

  it('deve submeter o formulário com dados válidos', async () => {
    const user = userEvent.setup();
    const mockTarefa = { id: 1, titulo: 'Tarefa de teste', concluida: false };
    
    (addTarefa as jest.Mock).mockResolvedValue(mockTarefa);
    
    render(<NovaTarefa onTarefaAdicionada={mockOnTarefaAdicionada} />);

    const input = screen.getByPlaceholderText('Digite uma nova tarefa...');
    const button = screen.getByRole('button', { name: 'Adicionar' });

    await user.type(input, 'Tarefa de teste');
    await user.click(button);

    expect(addTarefa).toHaveBeenCalledWith('Tarefa de teste');
    
    await waitFor(() => {
      expect(mockOnTarefaAdicionada).toHaveBeenCalledWith(mockTarefa);
    });
    
    expect(input).toHaveValue('');
  });

  it('deve mostrar estado de carregamento durante o envio', async () => {
    const user = userEvent.setup();
    let resolvePromise: (value: any) => void;
    
    const promise = new Promise(resolve => {
      resolvePromise = resolve;
    });
    
    (addTarefa as jest.Mock).mockReturnValue(promise);
    
    render(<NovaTarefa onTarefaAdicionada={mockOnTarefaAdicionada} />);

    const input = screen.getByPlaceholderText('Digite uma nova tarefa...');
    const button = screen.getByRole('button', { name: 'Adicionar' });

    await user.type(input, 'Tarefa de teste');
    await user.click(button);

    expect(screen.getByRole('button', { name: 'Adicionando...' })).toBeDisabled();
    
    resolvePromise!({ id: 1, titulo: 'Tarefa de teste', concluida: false });
    
    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Adicionar' })).toBeInTheDocument();
    });
  });
});