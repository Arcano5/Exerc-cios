import Link from "next/link";
import styles from "./CardDestino.module.css";

interface Destino {
  id: number;
  nome: string;
  imagem: string;
  descricao: string;
}

export default function CardDestino({ destino }: { destino: Destino }) {
  return (
    <div className={styles.card}>
      <img src={destino.imagem} alt={destino.nome} className={styles.imagem} />
      <h3>{destino.nome}</h3>
      <p>{destino.descricao.slice(0, 80)}...</p>
      <Link href={`/destinos/${destino.id}`} className={styles.link}>
        Ver mais
      </Link>
    </div>
  );
}
