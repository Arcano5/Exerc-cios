import './globals.css';
import type { ReactNode } from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Portal Blog',
  description: 'Blog de viagens - artigos e dicas.'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <header style={{ background: 'linear-gradient(90deg,#00aaff,#00ddaa)', padding: 16, color:'#fff' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', justifyContent:'space-between', alignItems:'center' }}>
            <h1 style={{ margin:0 }}>Portal Blog</h1>
            <nav>
              <Link href="/" style={{ color:'#fff', marginRight:16 }}>Início</Link>
              <Link href="/artigos" style={{ color:'#fff' }}>Artigos</Link>
            </nav>
          </div>
        </header>

        <main style={{ maxWidth: 1000, margin: '24px auto', padding: '0 16px' }}>
          {children}
        </main>

        <footer style={{ textAlign:'center', padding:24, background:'#f3f6f8' }}>
          © {new Date().getFullYear()} Portal Blog
        </footer>
      </body>
    </html>
  );
}
