// Seleciona a nossa ul com a lista de tarefas no HTML
const tarefas = document.getElementById("listaTarefas");
// Faz uma requisição GET para a API externa pra buscar todas as tarefas
fetch("https://crudcrud.com/api/99b2c5ce8f6a423c9cfebc51825daebe/tarefas")
.then(responsta => responsta.json()) // Converte o corpo da resposta em JSON
.then((listaDeTarefas)=>{
    //Itera sobre cada tarefa do array
    listaDeTarefas.forEach(tarefa => {
        //Cria um novo elemento de lsita (<li>) para cada tarefa
        const item = document.createElement("li");
        //Define o conteúdo HTML do item, incluindo descrição e botão
        item.innerHTML = `${tarefa.descricao} <button onclick = "remove(${tarefa._id})>X</button>`;
        //Adiciona o novo item à lista de tarefas no HTML
        tarefas.appendChild(item);
    });
})
//Adiciona um ouvinte de evento de click no botão "adicionar"
document.getElementById("add").addEventListener("click", ()=>{
    //Pega a descrição que o usuário adicionou no input com ID tarefa
    const descricao = document.getElementById("tarefa").value;
    // Faz uma requisição POST para a API externa para criar a tarefa
    fetch("https://crudcrud.com/api/99b2c5ce8f6a423c9cfebc51825daebe/tarefas", {
        // Definido como POST, mas podemos usar GET, POST, PUT e DELETE
        method: "POST",
        // Definimos os cabeçalhos da requisição, com o tipo do conteúdo JSON
        headers: {
            "Content-Type": "application/json"
        },
        //Convertemos um objeto JS paara uma string JSON e passamos no corpo
        body: JSON.stringify({descricao: descricao})
    })
    .then(resposta=> resposta.json())
    .then((tarefa) =>{
        //Cria um novo elemento de lsita (<li>) para cada tarefa
        const item = document.createElement("li");
        //Define o conteúdo HTML do item, incluindo descrição e botão
        item.innerHTML = `${tarefa.descricao} <button onclick = "remove(${tarefa._id})>X</button>`;
        //Adiciona o novo item à lista de tarefas no HTML
        tarefas.appendChild(item);
    })
})

//Boas práticas
fetch('https://api.exemplo.com/dados')
  .then(response => {
    if (!response.ok) {
      throw new Error('Erro na requisição');
    }
    return response.json();
  })
  .then(data => console.log(data))
  .catch(error => console.error('Erro:', error));