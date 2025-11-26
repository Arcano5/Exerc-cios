import { getArtigoBySlug } from "@/lib/articles";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import artigos from "@/data/artigos.json"; // caminho do seu JSON

export const dynamic = "force-static";

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

// ✅ Compatível com Next 16 (usa Awaited<>)
type PageProps = {
  params: Promise<{ slug: string }>;
};

// 🔹 Gera metadados dinâmicos com base no slug
export async function generateMetadata(
  { params }: Awaited<PageProps>
): Promise<Metadata> {
  const resolvedParams = await params;
  const artigo = await getArtigoBySlug(resolvedParams.slug);
  if (!artigo) {
    return { title: "Artigo não encontrado" };
  }

  return {
    title: artigo.titulo,
    description: artigo.descricao,
  };
}

// 🔹 Página do artigo
export default async function ArtigoPage({ params }: Awaited<PageProps>) {
  const resolvedParams = await params;
  const artigo = artigos.find((a) => a.slug === resolvedParams.slug);

  if (!artigo) return notFound();

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold">{artigo.titulo}</h1>
      <p className="text-gray-600">{artigo.data}</p>
      <div className="mt-4">{artigo.conteudo}</div>
    </main>
  );
}
