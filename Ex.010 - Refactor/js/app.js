import { Cliente } from "./classe.js";
import { salvarNoLocalStorage, carregarDoLocalStorage } from "./util.js";

let clientes = carregarDoLocalStorage("clientes");

const nomeInput = document.getElementById("nome");
const emailInput = document.getElementById("email");
const telefoneInput = document.getElementById("telefone");
const enderecoInput = document.getElementById("endereco");
const btnAdicionar = document.getElementById("btnAdicionar");
const listaClientes = document.getElementById("listaClientes");

btnAdicionar.addEventListener("click", () => {
  const nome = nomeInput.value.trim();
  const email = emailInput.value.trim();
  const telefone = telefoneInput.value.trim();
  const endereco = enderecoInput.value.trim();

  if (!nome || !email || !telefone || !endereco) {
    alert("Preencha todos os campos!");
    return;
  }

  const novoCliente = new Cliente(nome, email, telefone, endereco);
  clientes.push(novoCliente);
  salvarNoLocalStorage("clientes", clientes);
  atualizarLista();
  limparCampos();
});

function limparCampos() {
  nomeInput.value = "";
  emailInput.value = "";
  telefoneInput.value = "";
  enderecoInput.value = "";
}

function atualizarLista() {
  listaClientes.innerHTML = "";
  clientes.forEach((cliente, index) => {
    const li = document.createElement("li");
    li.textContent = `${cliente.nome} - ${cliente.email} - ${cliente.telefone} - ${cliente.endereco}`;

    const btnExcluir = document.createElement("button");
    btnExcluir.textContent = "Excluir";
    btnExcluir.addEventListener("click", () => {
      clientes.splice(index, 1);
      salvarNoLocalStorage("clientes", clientes);
      atualizarLista();
    });

    li.appendChild(btnExcluir);
    listaClientes.appendChild(li);
  });
}

document.addEventListener("DOMContentLoaded", atualizarLista);
