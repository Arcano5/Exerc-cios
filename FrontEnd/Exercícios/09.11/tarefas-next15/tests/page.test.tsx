import { render, screen } from "@testing-library/react";
import HomePage from "@/app/page";
import * as tarefas from "@/lib/tarefas";

jest.spyOn(tarefas, "getTarefas").mockResolvedValue([
  { id: 1, titulo: "Tarefa mockada" },
]);

describe("Página Home", () => {
  it("exibe lista de tarefas", async () => {
    const Page = await HomePage();
    render(Page as any);
    expect(screen.getByText("Tarefa mockada")).toBeInTheDocument();
  });
});
