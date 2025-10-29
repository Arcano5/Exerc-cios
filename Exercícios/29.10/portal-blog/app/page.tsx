import Link from "next/link";
import { getArtigos } from "@/lib/articles";
import styles from "./page.module.css";

export default async function HomePage() {
  const artigos = await getArtigos();

  return (
    <main className={styles.container}>
      <h1 className={styles.titulo}>Blog Carmesim</h1>
      <p className={styles.subtitulo}>
        Reflexões, tecnologia e conhecimento em um só lugar.
      </p>

      <section className={styles.lista}>
        {artigos.map((artigo) => (
          <Link key={artigo.slug} href={`/artigos/${artigo.slug}`} className={styles.card}>
            <h2>{artigo.titulo}</h2>
            <p>{artigo.descricao}</p>
            <small>
              Por <strong>{artigo.autor}</strong> —{" "}
              {new Date(artigo.data).toLocaleDateString()}
            </small>
          </Link>
        ))}
      </section>
    </main>
  );
}
