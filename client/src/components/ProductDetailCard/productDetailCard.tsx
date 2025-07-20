import { useState } from "react";
import { Produto } from "../../interfaces/interfaces";
import useCartStore from "../../stores/CartStore";
import styles from "./product-Detail-Card.module.css";
import subtract from '../../assets/Subtract.svg'
import plus from '../../assets/Plus Math.svg'
import favorite from '../../assets/empty-Heart.svg'
import favoritado from '../../assets/full-heart.svg'
import { useNavigate } from "react-router-dom";

export default function ProductDetailCard({ produto }: { produto: Produto }) {
    
    const aumentarQuantidade = () => setQuantidade(quantidade + 1);
    const { addToCart } = useCartStore()
    const [quantidade, setQuantidade] = useState(1)
    const navigate = useNavigate()

    const diminuirQuantidade = () => {
        if(quantidade > 1) {
            setQuantidade(quantidade - 1)
        }
    };
    
    


    
    function handleClick() {
        navigate('/')
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

            <div className={styles.quantidadeContainer}>
                <h4>Quantidade:</h4>

                <div  className={styles.quantidadeBotoes}>
                    <button className={styles.diminuirBotao} onClick={diminuirQuantidade}>
                        <img src={subtract} alt="subtract-sign" /> 
                    </button>
                    <span>{quantidade}</span>
                    <button className={styles.aumentarBotao} onClick={aumentarQuantidade} disabled={quantidade >= (produto.qtdEstoque ?? 0)}>
                        <img src={plus} alt="plus-sign" /> 
                    </button>
                        </div>
                    </div> 

            <button className={styles.addToCartButton}
            onClick={() => { addToCart({ ...produto, quantidade}); handleClick(); }}
            disabled={produto.qtdEstoque === 0}>
            Adicionar ao Carrinho</button>
            <button className={styles.buyNowButton}>Comprar Agora</button>
            <p className={styles.productStock}>Estoque: {produto.qtdEstoque}</p>
          </div>
        </div>
      </div>
      

    </div>
    )
}