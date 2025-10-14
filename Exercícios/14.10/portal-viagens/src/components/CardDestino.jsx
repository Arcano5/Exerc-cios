'use client';
import Link from 'next/link';
import styles from '@/styles/Destinos.module.css';

export default function CardDestino({ destino }) {
  return (
    <Link href={`/destinos/${destino.id}`} className={styles.card}>
      <img src={destino.imagem} alt={destino.nome} />
      <h3>{destino.nome}</h3>
      <p>{destino.descricao}</p>
    </Link>
  );
}
