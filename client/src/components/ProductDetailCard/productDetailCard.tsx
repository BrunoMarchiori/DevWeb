import { use, useEffect, useState } from "react";
import { Produto } from "../../interfaces/interfaces";
import useCartStore from "../../stores/CartStore";
import styles from "./product-Detail-Card.module.css";
import subtract from '../../assets/Subtract.svg'
import plus from '../../assets/Plus Math.svg'
import favorite from '../../assets/empty-Heart.svg'
import favoritado from '../../assets/full-heart.svg'
import { useNavigate } from "react-router-dom";
import useFavoriteStore from "../../stores/FavoriteStore";

export default function ProductDetailCard({ produto }: { produto: Produto }) {
    
    const { favorites, fetchFavorites, addFavorite, removeFavorite, isFavorite } = useFavoriteStore()
    const { addToCart } = useCartStore()
    const [userId, setUserId] = useState<number | null>(null);
    
    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        if (storedUserId) {
            setUserId(parseInt(storedUserId, 10));
        }
    }, []);
    
    const navigate = useNavigate()


    
    function handleClick() {
        navigate('/')
    }

    function handleFavorite() {
        console.log('entrei')
        if (isFavorite(produto.id)) {
            removeFavorite(produto.id);
            console.log('Produto removido dos favoritos:', produto);
        } else {
            addFavorite(produto);
            console.log('Produto favoritado:', produto);
        }
        
    }

    return (
        <div className={styles.mainDiv}>
      <div className={styles.productDetails}>
        <div>
          <div>
            <img 
              src={`http://localhost:8080/api/imagens/${produto.id}`} 
              alt={produto.nome} 
              className={styles.productImage}
            />
          </div>
          <div className={styles.productInfo}>
            <h1 className={styles.productName}>{produto.nome}</h1>
            
            <p className={styles.productPrice}>Preço: R$ {produto.preco.toFixed(2)}</p>

            <p className={styles.productDescription}>{produto.descricao}</p>


            <button className={styles.addToCartButton}
            onClick={() => { addToCart({ ...produto}); handleClick(); }}
            disabled={produto.qtdEstoque === 0}>
            Adicionar ao Carrinho</button>
            <button className={styles.buyNowButton}>Comprar Agora</button>
            <button className={styles.FavoritarButton} disabled={userId ? false : true} onClick={handleFavorite}>{isFavorite(produto.id) ? 'Desfavoritar' : 'Favoritar'}</button>
            <p className={styles.productStock}>Estoque: {produto.qtdEstoque}</p>
          </div>
        </div>
      </div>
      

    </div>
    )
}