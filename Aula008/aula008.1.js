//Web Storage API
// Métodos Principais
// setitem(Key, value): método é usado para salvar dados no localStorage
// getitem(key): método é usado para recuperar dados armazenados no localStorage
// removeitem(key): Método é usado para remover um item específico do localStorage
// clear(): Método remove todos os itens armazenados no localStorage
//localStorage.setItem('chave', valor); // Salva
//localStorage.getItem('chave'); // Recupera
//localStorage.removeItem('chave'); // Remove
//localStorage.clear(); // Limpa tudo
const botaoTema = document.getElementeById("botaoTema");

botaoTema.addEventListener("click", ()=>{
    //Verificar se o usuário já te um tema pré-definido
    const temaAtual = localStorage.getItem("Tema");
    //Verificar qual é o tema e inverte
    const novoTema = temaAtual === "dark" ? "light" : "dark";
    //Adicionar a classe dark no elemento body
    document.body.classList.toggle(novoTema);
    //Salvar as preferências do usuário
    localStorage.setItem("tema", novoTema);
    //Atualiza o texto do botão
    botaoTema.textContent = novoTema === "dark" ? "@" : "#"
})
document.addEventListener('DOMContentLoaded', ()=>{
    //Verificar se tem tema salvo
    const temaSalvo = localStorage.getItem("tema");
    //Se for dark, adiciona a calsse e altera o botão
    if(temaSalvo === "dark"){
        document.body.classList.add("dark");
        botaoTema.textContent = "@";
    }else{
        //Caso contrário e light e o botão deve ser pra mudar pra dark
        botaoTema.textContent = "#";
    }
})