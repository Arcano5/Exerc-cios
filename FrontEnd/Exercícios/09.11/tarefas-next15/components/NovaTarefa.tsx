"use client";
import { useState } from "react";
import { adicionarTarefa } from "../lib/tarefas";

interface Props {
  onAdicionar: () => void;
}

export default function NovaTarefa({ onAdicionar }: Props) {
  const [titulo, setTitulo] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (titulo.trim()) {
      adicionarTarefa(titulo);
      setTitulo("");
      onAdicionar();
    }
  }

  return (
    <form onSubmit={handleSubmit} data-testid="form-tarefa" className="mt-4">
      <input
        type="text"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        placeholder="Digite a nova tarefa"
        className="border p-2 rounded"
      />
      <button type="submit" className="ml-2 bg-carmesi text-white px-4 py-2 rounded">
        Adicionar
      </button>
    </form>
  );
}
