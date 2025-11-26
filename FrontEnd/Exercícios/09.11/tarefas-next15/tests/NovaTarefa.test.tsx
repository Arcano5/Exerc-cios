import { render, screen, fireEvent } from "@testing-library/react";
import NovaTarefa from "@/components/NovaTarefa";

describe("Componente NovaTarefa", () => {
  it("renderiza input e botão", () => {
    render(<NovaTarefa onAdicionar={() => {}} />);
    expect(screen.getByPlaceholderText("Digite a nova tarefa")).toBeInTheDocument();
    expect(screen.getByText("Adicionar")).toBeInTheDocument();
  });

  it("limpa o input após adicionar", () => {
    const mockAdicionar = jest.fn();
    render(<NovaTarefa onAdicionar={mockAdicionar} />);
    const input = screen.getByPlaceholderText("Digite a nova tarefa");
    fireEvent.change(input, { target: { value: "Nova tarefa" } });
    fireEvent.submit(screen.getByTestId("form-tarefa"));
    expect(mockAdicionar).toHaveBeenCalled();
    expect(input).toHaveValue("");
  });
});
