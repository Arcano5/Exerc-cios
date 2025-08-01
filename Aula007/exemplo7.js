//Objeto Literal
const pessoa = {nome: "Carlos", idade: 20}

// Criar Classe
class Veiculo {

    //Método construtor
    constructor(marca, modelo, ano){
        this.marca = marca;
        this.modelo = modelo;
        this.ano = ano;

        //Atributo privado para indicar se o veículo está ligado
        this._ligado = false;
    }
    //Métodos
    ligar(){
        this._ligado = true;
        console.log("O veículo foi ligado.")
    }
    desligar(){
        this._ligado = false;
        console.log("O veículo foi desligado.")
    }
    // Método getter para obter valor do atributo privado
    get ligado(){
        return this._ligado;
    }
}
const veiculoNovo = new Veiculo("Honda", "Civic", 2025);

console.log(veiculoNovo);
veiculoNovo.ligar();
veiculoNovo.desligar();
console.log("O carro está ligado?", veiculoNovo._ligado);

//Herança
class Moto extends Veiculo{
    constructor(marca, modelo, ano){
        super(marca, modelo, ano)
    }
}
const motoNova = new Moto("Yamaha", "MR.07", 2025);
console.log(motoNova);
motoNova.ligar();

class Carro extends Veiculo{
    constructor(marca, modelo, ano, numeroPortas){
        super(marca, modelo, ano);
        this.numeroPortas = numeroPortas;
    }
    abriPortas(){
        console.log("As portas do carro foram abertas. ");
    }
}
const carroNovo = new Carro("Siena", "Sedan", 2002, 4);
console.log(carroNovo);
carroNovo.ligar();

// Exemplo que gostei do boas práticas

class ContaBancaria {
    constructor(numero, saldo) {
        this.numero = numero;
        this.saldo = saldo;
    }

    depositar(valor) {
        this.saldo += valor;
    }

    sacar(valor) {
        if (valor <= this.saldo) {
            this.saldo -= valor;
        } else {
            console.log('Saldo insuficiente');
        }
    }

    exibirSaldo() {
        console.log(`Saldo da conta ${this.numero}: R$ ${this.saldo}`);
    }
}

const minhaConta = new ContaBancaria(12345, 1000);
minhaConta.depositar(500);
minhaConta.sacar(200);
minhaConta.exibirSaldo();