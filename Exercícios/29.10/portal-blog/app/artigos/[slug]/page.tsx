import { getArtigoBySlug } from "@/lib/articles";
import { Metadata } from "next";

interface Props {
  params: { slug: string };
}

// 🔹 Gera metadados dinâmicos
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const artigo = await getArtigoBySlug(params.slug);
  if (!artigo) return { title: "Artigo não encontrado" };

  return {
    title: artigo.titulo,
    description: artigo.descricao,
  };
}

export default async function ArtigoPage({ params }: Props) {
  const artigo = await getArtigoBySlug(params.slug);

  if (!artigo) {
    return <h2>Artigo não encontrado 😢</h2>;
  }

  return (
    <article style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ color: "#DC143C" }}>{artigo.titulo}</h1>
      <p>
        <strong>{artigo.autor}</strong> — {new Date(artigo.data).toLocaleDateString()}
      </p>
      <p style={{ fontStyle: "italic", color: "#555" }}>{artigo.descricao}</p>
      <hr style={{ margin: "1rem 0" }} />
      <p style={{ lineHeight: "1.6" }}>{artigo.conteudo}</p>
    </article>
  );
}
