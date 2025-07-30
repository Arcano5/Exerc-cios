class Parquimetro{
    constructor(valor){
        this.valor = valor;
    }
    calcularTempo(){
        if (this.valor < 1.00){
            return{tempo:0, troco:0, mensagem: "Valor insuficiente."}
        }
        let tempo = 0;
        if (this.valor >= 1 && this.valor < 1.75){
            tempo = 30;
        }
        else if (this.valor >= 1.75 && this.valor < 3.00){
            tempo = 60;
        }
        else if (this.valor >= 3.00){
            tempo = 120;
        }

        //Calcula o valor real necessário para o tempo
        let valorUsado = 0;
        if (tempo === 30) valorUsado = 1.00;
        else if (tempo === 60) valorUsado = 1.75;
        else if (tempo === 120) valorUsado = 3.00;

        const troco = this.valor - valorUsado;

        return{
            tempo,
            troco: troco.toFixed(2),
            mensagem: `Tempo: ${tempo} minutos | Troco: R$ ${troco.toFixed(2)}`
        };
    }
}
function simularParquimetro() {
    const valor = parseFloat(document.getElementById("valor").value);
    const parquimetro = new Parquimetro(valor);
    const resultado = parquimetro.calcularTempo();

    const resultadoEl = document.getElementById("resultado");
    resultadoEl.textContent = resultado.mensagem;
}
