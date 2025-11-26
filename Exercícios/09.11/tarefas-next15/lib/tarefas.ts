export type Tarefa = {
  id: number;
  titulo: string;
};

let tarefas: Tarefa[] = [
  { id: 1, titulo: "Estudar Next.js" },
  { id: 2, titulo: "Fazer testes unitários" },
];

export async function getTarefas(): Promise<Tarefa[]> {
  // simula fetch
  return Promise.resolve(tarefas);
}

export function adicionarTarefa(titulo: string) {
  const nova = { id: Date.now(), titulo };
  tarefas.push(nova);
  return nova;
}
