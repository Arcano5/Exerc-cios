import fs from 'fs';
import path from 'path';

export interface Artigo {
  slug: string;
  titulo: string;
  autor: string;
  data: string;
  descricao: string;
  conteudo: string;
}

const filePath = path.join(process.cwd(), 'data/artigos.json');

export async function getArtigos(): Promise<Artigo[]> {
  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data);
}

export async function getArtigoBySlug(slug: string): Promise<Artigo | undefined> {
  const artigos = await getArtigos();
  return artigos.find((a) => a.slug === slug);
}
