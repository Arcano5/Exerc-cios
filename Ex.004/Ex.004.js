function calcularMassa(){

    //Entrada de dados
    let altura = document.getElementById("altura").value;
    let massa = document.getElementById("massa").value;

    //console.log(valorOriginal)
    //Processamento
    let valorFinal = massa / (altura * altura)
    document.getElementById("resultado").textContent = "Valor final: " + valorFinal;
    //Saída
}