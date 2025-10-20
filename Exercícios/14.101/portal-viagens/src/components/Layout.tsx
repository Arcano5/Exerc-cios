import Link from "next/link";
import styles from "./Layout.module.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Portal de Viagens</h1>
        <nav>
          <Link href="/">Início</Link>
          <Link href="/destinos">Destinos</Link>
        </nav>
      </header>

      <main className={styles.main}>{children}</main>

      <footer className={styles.footer}>
        <p>© 2025 Portal de Viagens. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
