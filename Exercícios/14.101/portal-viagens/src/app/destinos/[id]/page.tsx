import Layout from "@/components/Layout";
import { destinos } from "@/data/destinos";

interface Props {
  params: { id: string };
}

export default function DetalheDestinoPage({ params }: Props) {
  const destino = destinos.find((d) => d.id === Number(params.id));

  if (!destino) {
    return (
      <Layout>
        <p>Destino não encontrado.</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <h2>{destino.nome}</h2>
      <img src={destino.imagem} alt={destino.nome} width="600" />
      <p>{destino.descricao}</p>
    </Layout>
  );
}
