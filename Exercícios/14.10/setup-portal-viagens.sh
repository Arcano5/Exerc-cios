#!/bin/bash

# ============================================================
# Script de instalação e configuração do projeto "Portal Viagens"
# ============================================================

echo "🚀 Iniciando configuração do projeto Portal Viagens..."

# 1. Remove diretórios e arquivos antigos, se existirem
echo "🧹 Limpando diretórios anteriores..."
rm -rf portal-viagens node_modules .next package-lock.json yarn.lock

# 2. Cria um novo projeto Next.js sem TypeScript e sem Tailwind
echo "📦 Criando novo projeto Next.js..."
npx create-next-app@latest portal-viagens --typescript=false --eslint=true --tailwind=false --app --src-dir --import-alias="@/*"

# 3. Entra na pasta do projeto
cd portal-viagens || exit

# 4. Cria estrutura de diretórios
echo "📁 Criando estrutura de pastas..."
mkdir -p src/components src/styles

# 5. Cria componente Layout
cat << 'EOF' > src/components/Layout.jsx
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
EOF

# 6. Cria componente CardDestino
cat << 'EOF' > src/components/CardDestino.jsx
import styles from "../styles/CardDestino.module.css";
import Link from "next/link";

export default function CardDestino({ destino }) {
  return (
    <div className={styles.card}>
      <img src={destino.imagem} alt={destino.nome} />
      <h3>{destino.nome}</h3>
      <Link href={`/destinos/${destino.id}`}>Ver detalhes</Link>
    </div>
  );
}
EOF

# 7. Cria páginas
echo "📝 Criando páginas..."

# Página inicial
cat << 'EOF' > src/app/page.jsx
import Link from "next/link";
import Layout from "../components/Layout";

export default function Home() {
  return (
    <Layout>
      <h1>Bem-vindo ao Portal de Viagens</h1>
      <p>Descubra destinos incríveis pelo mundo!</p>
      <Link href="/destinos">Ver destinos</Link>
    </Layout>
  );
}
EOF

# Página de listagem de destinos
cat << 'EOF' > src/app/destinos/page.jsx
import Layout from "../../components/Layout";
import CardDestino from "../../components/CardDestino";
import styles from "../../styles/Destinos.module.css";

const destinos = [
  { id: 1, nome: "Paris", imagem: "https://picsum.photos/300?random=1" },
  { id: 2, nome: "Tóquio", imagem: "https://picsum.photos/300?random=2" },
  { id: 3, nome: "Nova York", imagem: "https://picsum.photos/300?random=3" },
  { id: 4, nome: "Rio de Janeiro", imagem: "https://picsum.photos/300?random=4" },
];

export default function Destinos() {
  return (
    <Layout>
      <h1>Destinos Turísticos</h1>
      <div className={styles.grid}>
        {destinos.map((destino) => (
          <CardDestino key={destino.id} destino={destino} />
        ))}
      </div>
    </Layout>
  );
}
EOF

# Página dinâmica de detalhes
mkdir -p src/app/destinos/[id]
cat << 'EOF' > src/app/destinos/[id]/page.jsx
import Layout from "../../../components/Layout";

const destinos = [
  { id: 1, nome: "Paris", descricao: "A cidade luz, repleta de arte e história.", imagem: "https://picsum.photos/600?random=1" },
  { id: 2, nome: "Tóquio", descricao: "Uma mistura fascinante de tradição e tecnologia.", imagem: "https://picsum.photos/600?random=2" },
  { id: 3, nome: "Nova York", descricao: "A cidade que nunca dorme.", imagem: "https://picsum.photos/600?random=3" },
  { id: 4, nome: "Rio de Janeiro", descricao: "Belezas naturais e alegria contagiante.", imagem: "https://picsum.photos/600?random=4" },
];

export default function DetalhesDestino({ params }) {
  const destino = destinos.find((d) => d.id.toString() === params.id);
  if (!destino) return <Layout><p>Destino não encontrado.</p></Layout>;

  return (
    <Layout>
      <h1>{destino.nome}</h1>
      <img src={destino.imagem} alt={destino.nome} style={{ width: "100%", borderRadius: "10px" }} />
      <p>{destino.descricao}</p>
    </Layout>
  );
}
EOF

# 8. Cria estilos CSS Modules
echo "🎨 Criando arquivos de estilo..."

# Layout.module.css
cat << 'EOF' > src/styles/Layout.module.css
.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.header {
  background-color: #0070f3;
  padding: 1rem;
  color: white;
}
.header ul {
  display: flex;
  list-style: none;
  gap: 1rem;
}
.main {
  flex: 1;
  padding: 2rem;
}
.footer {
  text-align: center;
  background-color: #f1f1f1;
  padding: 1rem;
}
EOF

# CardDestino.module.css
cat << 'EOF' > src/styles/CardDestino.module.css
.card {
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 1rem;
  text-align: center;
  transition: transform 0.2s ease;
}
.card:hover {
  transform: scale(1.05);
}
.card img {
  width: 100%;
  border-radius: 8px;
}
EOF

# Destinos.module.css
cat << 'EOF' > src/styles/Destinos.module.css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
}
EOF

# 9. Finaliza
echo "✅ Instalação concluída! Para rodar o projeto:"
echo "-------------------------------------------------"
echo "cd portal-viagens"
echo "npm run dev"
echo "-------------------------------------------------"
echo "🌐 Acesse http://localhost:3000"
