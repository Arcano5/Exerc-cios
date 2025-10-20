import Layout from "@/components/Layout";
import CardDestino from "@/components/CardDestino";
import { destinos } from "@/data/destinos";
import styles from "./page.module.css";

export default function DestinosPage() {
  return (
    <Layout>
      <h2>Destinos turísticos</h2>
      <div className={styles.grid}>
        {destinos.map((destino) => (
          <CardDestino key={destino.id} destino={destino} />
        ))}
      </div>
    </Layout>
  );
}
