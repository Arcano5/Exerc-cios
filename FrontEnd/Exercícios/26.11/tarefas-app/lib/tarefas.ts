// Simulação de dados e API
export interface Tarefa {
  id: number;
  titulo: string;
  concluida: boolean;
}

let tarefas: Tarefa[] = [
  { id: 1, titulo: 'Estudar Next.js', concluida: false },
  { id: 2, titulo: 'Fazer testes unitários', concluida: true },
  { id: 3, titulo: 'Configurar TypeScript', concluida: false },
];

export async function getTarefas(): Promise<Tarefa[]> {
  // Simula delay de API
  await new Promise(resolve => setTimeout(resolve, 100));
  return [...tarefas];
}

export async function addTarefa(titulo: string): Promise<Tarefa> {
  await new Promise(resolve => setTimeout(resolve, 100));
  
  const novaTarefa: Tarefa = {
    id: Date.now(),
    titulo,
    concluida: false,
  };
  
  tarefas.push(novaTarefa);
  return novaTarefa;
}