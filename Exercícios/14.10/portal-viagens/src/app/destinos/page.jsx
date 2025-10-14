import CardDestino from '@/components/CardDestino';
import styles from '@/styles/Destinos.module.css';

const destinos = [
  { id: 'paris', nome: 'Paris', imagem: '/paris.jpg', descricao: 'A cidade luz, cheia de arte e romance.' },
  { id: 'rio', nome: 'Rio de Janeiro', imagem: '/rio.jpg', descricao: 'Paisagens naturais e cultura vibrante.' },
  { id: 'tokyo', nome: 'Tóquio', imagem: '/tokyo.jpg', descricao: 'Tradição e tecnologia em perfeita harmonia.' },
  { id: 'newyork', nome: 'Nova York', imagem: '/newyork.jpg', descricao: 'A cidade que nunca dorme.' },
];

export default function DestinosPage() {
  return (
    <div className={styles.container}>
      <h1>Destinos Turísticos</h1>
      <div className={styles.grid}>
        {destinos.map((destino) => (
          <CardDestino key={destino.id} destino={destino} />
        ))}
      </div>
    </div>
  );
}
