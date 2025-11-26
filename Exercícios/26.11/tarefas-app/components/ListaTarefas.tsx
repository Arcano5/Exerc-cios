import { Tarefa } from '../lib/tarefas';

interface ListaTarefasProps {
  tarefas: Tarefa[];
}

export default function ListaTarefas({ tarefas }: ListaTarefasProps) {
  if (tarefas.length === 0) {
    return <p className="text-gray-500">Nenhuma tarefa encontrada.</p>;
  }

  return (
    <ul className="space-y-2">
      {tarefas.map((tarefa) => (
        <li
          key={tarefa.id}
          className={`p-3 border rounded-md ${
            tarefa.concluida ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'
          }`}
        >
          <div className="flex items-center">
            <span
              className={`flex-shrink-0 w-4 h-4 rounded-full border mr-3 ${
                tarefa.concluida ? 'bg-green-500 border-green-500' : 'border-gray-300'
              }`}
            />
            <span className={tarefa.concluida ? 'line-through text-gray-500' : ''}>
              {tarefa.titulo}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}