import { useState, useEffect } from "react";
import { getTarefas } from "../lib/tarefas";

export function useContadorDeTarefas() {
  const [quantidade, setQuantidade] = useState(0);

  useEffect(() => {
    getTarefas().then((t) => setQuantidade(t.length));
  }, []);

  return quantidade;
}
