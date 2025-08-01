const API_URL = ' https://crudcrud.com/api/99b2c5ce8f6a423c9cfebc51825daebe/clientes';

const form = document.getElementById('clienteForm');
const lista = document.getElementById('listaClientes');

// Cadastrar cliente (POST)
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;

  const cliente = { nome, email };

  try {
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cliente)
    });

    form.reset();
    buscarClientes(); // Atualiza a lista
  } catch (err) {
    console.error('Erro ao cadastrar:', err);
  }
});

// Listar clientes (GET)
async function buscarClientes() {
  try {
    const resposta = await fetch(API_URL);
    const clientes = await resposta.json();

    lista.innerHTML = '';
    clientes.forEach(cliente => {
      const li = document.createElement('li');
      li.textContent = `${cliente.nome} - ${cliente.email}`;

      const btnExcluir = document.createElement('button');
      btnExcluir.textContent = 'Excluir';
      btnExcluir.onclick = () => excluirCliente(cliente._id);

      li.appendChild(btnExcluir);
      lista.appendChild(li);
    });
  } catch (err) {
    console.error('Erro ao listar clientes:', err);
  }
}

// Excluir cliente (DELETE)
async function excluirCliente(id) {
  try {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    buscarClientes(); // Atualiza a lista
  } catch (err) {
    console.error('Erro ao excluir:', err);
  }
}

// Carrega os clientes ao abrir a página
buscarClientes();
