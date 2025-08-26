export class ChecklistVeicular {
  constructor(formId, resultadoId) {
    this.form = document.getElementById(formId);
    this.resultado = document.getElementById(resultadoId) || this.criarResultado();
    this.perguntas = [
      "pneusCalibrados",
      "luzFuncionando",
      "oaVerificados",
      "docVerificado"
    ];
    this.btn = document.getElementById("btnVerificar");
    this.btn.addEventListener("click", () => this.verificar());
  }

  criarResultado() {
    const div = document.createElement("div");
    div.id = "resultado";
    this.form.insertAdjacentElement("afterend", div);
    return div;
  }

  verificar() {
    let tudoOk = true;

    this.perguntas.forEach((name) => {
      const resposta = document.querySelector(`input[name="${name}"]:checked`)?.value;
      const fieldset = document.querySelector(`input[name="${name}"]`).closest("fieldset");

      if (resposta === "true") {
        fieldset.classList.remove("erro");
      } else {
        fieldset.classList.add("erro");
        tudoOk = false;
      }
    });

    this.resultado.textContent = tudoOk
      ? "Tudo certo! Boa viagem! 🚗💨"
      : "Atenção! Verifique os itens marcados como 'Não' antes de seguir viagem.";
    this.resultado.style.color = tudoOk ? "green" : "red";
  }
}
