import Layout from "@/components/Layout";
import Link from "next/link";

export default function HomePage() {
  return (
    <Layout>
      <h2>Bem-vindo ao Portal de Viagens!</h2>
      <p>
        Explore os melhores destinos turísticos do Brasil e descubra novas
        experiências.
      </p>
      <Link href="/destinos">Ver destinos</Link>
    </Layout>
  );
}
