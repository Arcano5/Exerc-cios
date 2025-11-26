import { renderHook } from "@testing-library/react";
import { useContadorDeTarefas } from "@/hooks/useContadorDeTarefas";

jest.mock("@/lib/tarefas", () => ({
  getTarefas: jest.fn(() => Promise.resolve([{ id: 1, titulo: "teste" }])),
}));

describe("Hook useContadorDeTarefas", () => {
  it("retorna a quantidade de tarefas", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useContadorDeTarefas());
    await waitForNextUpdate();
    expect(result.current).toBe(1);
  });
});
