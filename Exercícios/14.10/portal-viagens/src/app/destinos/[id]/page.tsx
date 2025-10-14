import styles from '@/styles/Destinos.module.css';
import Image from 'next/image';
import Link from 'next/link';

const destinos = {
  paris: {
    nome: 'Paris',
    imagem: '/paris.jpg',
    descricao: 'Paris é famosa por sua arte, gastronomia e arquitetura. O ponto mais emblemático é a Torre Eiffel.',
  },
  rio: {
    nome: 'Rio de Janeiro',
    imagem: '/rio.jpg',
    descricao: 'O Rio encanta com suas praias, o Cristo Redentor e o Pão de Açúcar. Um destino vibrante e acolhedor.',
  },
  tokyo: {
    nome: 'Tóquio',
    imagem: '/tokyo.jpg',
    descricao: 'Capital do Japão, mistura o moderno com o tradicional. Uma metrópole única no mundo.',
  },
  newyork: {
    nome: 'Nova York',
    imagem: '/newyork.jpg',
    descricao: 'Conhecida como “a cidade que nunca dorme”, Nova York é cheia de energia, cultura e história.',
  },
};

export default function DestinoPage({ params }: { params: { id: string } }) {
  const destino = destinos[params.id as keyof typeof destinos];

  if (!destino) return <p>Destino não encontrado.</p>;

  return (
    <div className={styles.detail}>
      <Image src={destino.imagem} alt={destino.nome} width={800} height={500} />
      <h1>{destino.nome}</h1>
      <p>{destino.descricao}</p>
      <Link href="/destinos" className={styles.voltar}>← Voltar</Link>
    </div>
  );
}
