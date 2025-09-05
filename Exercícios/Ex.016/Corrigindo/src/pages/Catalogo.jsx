import { useState, useEffect } from "react";
import ProdutoCard from "../components/ProdutoCard";

export default function Catalogo() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);

  const [novoProduto, setNovoProduto] = useState({
    nome: "",
    preco: "",
    descricao: "",
    imagem: "",
  });

  useEffect(() => {
    setTimeout(() => {
      const produtosMock = [
        {
          nome: "Notebook",
          preco: 3500,
          descricao: "Notebook potente",
          imagem: "https://via.placeholder.com/150",
        },
        {
          nome: "Celular",
          preco: 2500,
          descricao: "Smartphone moderno",
          imagem: "https://via.placeholder.com/150",
        },
      ];
      setProdutos(produtosMock);
      setLoading(false);
    }, 2000);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNovoProduto({ ...novoProduto, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!novoProduto.nome || !novoProduto.preco || !novoProduto.descricao) {
      alert("Preencha todos os campos obrigatórios!");
      return;
    }
    setProdutos([...produtos, novoProduto]);
    setNovoProduto({ nome: "", preco: "", descricao: "", imagem: "" });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Catálogo de Produtos</h1>

      {loading ? (
        <p>Carregando produtos...</p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {produtos.map((p, index) => (
            <ProdutoCard
              key={index}
              nome={p.nome}
              preco={p.preco}
              descricao={p.descricao}
              imagem={p.imagem || "https://via.placeholder.com/150"}
            />
          ))}
        </div>
      )}

      <h2>Adicionar Produto</h2>
      <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
        <input
          type="text"
          name="nome"
          placeholder="Nome do produto"
          value={novoProduto.nome}
          onChange={handleChange}
        />
        <br />
        <input
          type="number"
          name="preco"
          placeholder="Preço"
          value={novoProduto.preco}
          onChange={handleChange}
        />
        <br />
        <textarea
          name="descricao"
          placeholder="Descrição"
          value={novoProduto.descricao}
          onChange={handleChange}
        />
        <br />
        <input
          type="text"
          name="imagem"
          placeholder="URL da imagem (opcional)"
          value={novoProduto.imagem}
          onChange={handleChange}
        />
        <br />
        <button type="submit">Adicionar</button>
      </form>
    </div>
  );
}
