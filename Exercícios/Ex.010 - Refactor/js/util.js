export function salvarNoLocalStorage(chave, dados) {
  localStorage.setItem(chave, JSON.stringify(dados));
}

export function carregarDoLocalStorage(chave) {
  const dados = localStorage.getItem(chave);
  return dados ? JSON.parse(dados) : [];
}
