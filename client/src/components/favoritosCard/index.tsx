import styles from './styles.module.css';
import emptyHeart from '../../assets/empty-Heart.svg';
import fullHeart from '../../assets/full-heart.svg';
import { useNavigate } from 'react-router-dom';
import { api } from '../../api/api';
import { FavoriteItem, Produto } from '../../interfaces/interfaces';
import useFavoriteStore from '../../stores/FavoriteStore';


interface FavoritoCardProps {
  produto: FavoriteItem;
  
}

export default function FavoritoCard({ produto }: FavoritoCardProps) {
  const navigate = useNavigate();
  const { favorites, fetchFavorites, addFavorite, removeFavorite, isFavorite } = useFavoriteStore()
  
  // Em caso de promoção, calcula o preço com desconto
  
  // Formatação dos valores para R$
  const formatPrice = (value: number) =>
    value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  return (
    <div className={styles.cardContainer} onClick={() => navigate(`/product/${produto.id}`)}>
      
      <div className={styles.iconsContainer} onClick={(e) => e.stopPropagation()}>
        
        <button
          className={styles.iconButton}
          onClick={() => {removeFavorite(produto.id);}}
          aria-label="Favoritar"
        >
          <img
            src={fullHeart}
            alt="Favoritar"
            className={styles.favoriteIcon}
          />
        </button>

      </div>

      {/* Imagem do produto */}
      <div className={styles.imageContainer}>
        <img
          src={`http://localhost:8080/api/imagens/${produto.id}`}
          alt={produto.nome}
          className={styles.produtoImage}
        />
      </div>

      {/* Retângulo azul com informações */}
      <div className={styles.infoContainer}>
        <h3 className={styles.produtoName}>{produto.nome}</h3>
        <div className={styles.infoText}>  
          <p className={styles.currentPrice}>
            {formatPrice(produto.preco)}
          </p>
          
        </div>
      </div>
    </div>
  );
}