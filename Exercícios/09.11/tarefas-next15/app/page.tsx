import { getTarefas } from "../lib/tarefas";
import NovaTarefa from "../components/NovaTarefa";
import { useContadorDeTarefas } from "../hooks/useContadorDeTarefas";

export default async function HomePage() {
  const tarefas = await getTarefas();

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Lista de Tarefas</h1>
      <ul>
        {tarefas.map((t) => (
          <li key={t.id} className="mb-2">
            ✅ {t.titulo}
          </li>
        ))}
      </ul>
      <NovaTarefa onAdicionar={() => console.log("Nova tarefa adicionada!")} />
    </main>
  );
}
