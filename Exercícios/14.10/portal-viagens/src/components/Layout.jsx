import Link from "next/link";
import styles from "../styles/Layout.module.css";

export default function Layout({ children }) {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <nav>
          <ul>
            <li><Link href="/">Início</Link></li>
            <li><Link href="/destinos">Destinos</Link></li>
          </ul>
        </nav>
      </header>

      <main className={styles.main}>{children}</main>

      <footer className={styles.footer}>
        <p>Portal de Viagens © {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}
