import { getArtigoBySlug } from "@/lib/articles";
import { Metadata } from "next";

export const dynamic = 'force-static';

export async function generateStaticParams() {
  const artigos = [
    {
      slug: 'introducao-ao-nextjs',
    },
    {
      slug: 'boas-praticas-de-seo',
    },
    {
      slug: 'javascript-moderno',
    },
  ];

  return artigos.map((artigo) => ({
    slug: artigo.slug,
  }));
}

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


import { notFound } from 'next/navigation';
import artigos from '@/data/artigos.json'; // caminho do seu JSON


export default function ArtigoPage({ params }: { params: { slug: string } }) {
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

