import { getArtigoBySlug } from "@/lib/articles";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import artigos from "@/data/artigos.json"; // caminho do seu JSON

// 🔹 Força renderização estática
export const dynamic = "force-static";

// 🔹 Gera rotas estáticas com base nos slugs
export async function generateStaticParams() {
  const artigos = [
    { slug: "introducao-ao-nextjs" },
    { slug: "boas-praticas-de-seo" },
    { slug: "javascript-moderno" },
  ];

  return artigos.map((artigo) => ({
    slug: artigo.slug,
  }));
}

// 🔹 Define o tipo de Props
interface Props {
  params: { slug: string };
}

// 🔹 Gera metadados dinâmicos com base no slug
export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const artigo = await getArtigoBySlug(params.slug);
  if (!artigo) {
    return { title: "Artigo não encontrado" };
  }

  return {
    title: artigo.titulo,
    description: artigo.descricao,
  };
}

// 🔹 Página do artigo
export default function ArtigoPage({ params }: Props) {
  const artigo = artigos.find((a) => a.slug === params.slug);

  if (!artigo) return notFound();

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold">{artigo.titulo}</h1>
      <p className="text-gray-600">{artigo.data}</p>
      <div className="mt-4">{artigo.conteudo}</div>
    </main>
  );
}
