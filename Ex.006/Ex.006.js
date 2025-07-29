const campoPalpite = document.getElementById("Palpite");
const mensagem = document.getElementById("mensagem");
const tentativas = document.getElementById("tentativas");
const botaoChutar = document.getElementById("botaoChutar");
const botaoReiniciar = document.getElementById("reiniciar");

let numeroSecreto = Math.floor(Math.random() * 100) + 1;
let tentativasRestantes = 10;

function verificarPalpite() {
    const palpite = parseInt(campoPalpite.value);

    if (isNaN(palpite) || palpite < 1 || palpite > 100) {
        mensagem.textContent = "Por favor, digite um número entre 1 e 100.";
        return;
    }

    tentativasRestantes--;

    if (palpite === numeroSecreto) {
        mensagem.textContent = "🎉 Parabéns! Você acertou!";
        tentativas.textContent = "";
        campoPalpite.disabled = true;
        botaoChutar.disabled = true;
        botaoReiniciar.style.display = "inline";
    } else if (palpite < numeroSecreto) {
        mensagem.textContent = "🔼 O número secreto é maior.";
    } else {
        mensagem.textContent = "🔽 O número secreto é menor.";
    }

    if (tentativasRestantes > 0 && palpite !== numeroSecreto) {
        tentativas.textContent = `Você ainda tem ${tentativasRestantes} tentativa(s).`;
    } else if (tentativasRestantes === 0 && palpite !== numeroSecreto) {
        mensagem.textContent = `☠️ Você perdeu! O número secreto era ${numeroSecreto}.`;
        tentativas.textContent = "Fim de jogo.";
        campoPalpite.disabled = true;
        botaoChutar.disabled = true;
        botaoReiniciar.style.display = "inline";
    }

    campoPalpite.value = "";
    campoPalpite.focus();
}

function reiniciarJogo() {
    numeroSecreto = Math.floor(Math.random() * 100) + 1;
    tentativasRestantes = 10;
    mensagem.textContent = "Sortearei um número entre 1 a 100, tente adivinhar!";
    tentativas.textContent = `Você tem ${tentativasRestantes} tentativas.`;
    campoPalpite.disabled = false;
    botaoChutar.disabled = false;
    botaoReiniciar.style.display = "none";
    campoPalpite.value = "";
    campoPalpite.focus();
}