// /js/app.js
import { Cliente } from './classes.js';
import { criarElementoCliente, limparLista } from './utils.js';

const API_URL = 'https://crudcrud.com/api/99b2c5ce8f6a423c9cfebc51825daebe/clientes';

const form = document.getElementById('clienteForm');
const lista = document.getElementById('listaClientes');

// Lógica principal

async function buscarClientes() {
  try {
    const resposta = await fetch(API_URL);
    const dados = await resposta.json();
    const clientes = dados.map(Cliente.fromJSON);

    atualizarLista(clientes);
  } catch (err) {
    console.error('Erro ao buscar clientes:', err);
  }
}

function atualizarLista(clientes) {
  limparLista(lista);
  clientes
    .map(cliente =>
      criarElementoCliente(cliente, excluirCliente)
    )
    .forEach(el => lista.appendChild(el));
}

async function cadastrarCliente(evento) {
  evento.preventDefault();

  const nome = document.getElementById('nome').value.trim();
  const email = document.getElementById('email').value.trim();

  if (!nome || !email) return;

  const novoCliente = new Cliente(nome, email);

  try {
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(novoCliente),
    });

    form.reset();
    buscarClientes();
  } catch (err) {
    console.error('Erro ao cadastrar:', err);
  }
}

async function excluirCliente(id) {
  try {
    await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    buscarClientes();
  } catch (err) {
    console.error('Erro ao excluir:', err);
  }
}

// Eventos
form.addEventListener('submit', cadastrarCliente);

// Inicialização
buscarClientes();
