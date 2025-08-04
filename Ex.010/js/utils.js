// /js/classes.js
export class Cliente {
  constructor(nome, email, id = null) {
    this.nome = nome;
    this.email = email;
    this._id = id; // ID fornecido pela API
  }

  static fromJSON(data) {
    return new Cliente(data.nome, data.email, data._id);
  }
}
