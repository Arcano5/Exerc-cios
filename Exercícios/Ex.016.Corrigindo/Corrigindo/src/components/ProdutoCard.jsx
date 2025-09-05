export default function ProdutoCard({ nome, preco, descricao, imagem }) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "10px",
        margin: "10px",
        background: "#fff",
        width: "200px",
        textAlign: "center",
      }}
    >
      <img
        src={imagem}
        alt={nome}
        style={{ width: "150px", height: "150px", objectFit: "cover" }}
      />
      <h2>{nome}</h2>
      <p><strong>Preço:</strong> R$ {preco}</p>
      <p>{descricao}</p>
    </div>
  );
}
