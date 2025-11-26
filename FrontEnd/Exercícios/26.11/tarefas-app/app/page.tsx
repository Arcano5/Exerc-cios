import { getTarefas } from '../lib/tarefas';
import TarefasClient from '../components/TarefasClient';

// Server Component
export default async function Home() {
  const tarefasIniciais = await getTarefas();

  return <TarefasClient tarefasIniciais={tarefasIniciais} />;
}