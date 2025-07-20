import { Produto } from "../../interfaces/interfaces";
import styles from "./product-Detail-Card.module.css";

export default function ProductDetailCard({ produto }: { produto: Produto }) {
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
            <button className={styles.addToCartButton}>Adicionar ao Carrinho</button>
            <button className={styles.buyNowButton}>Comprar Agora</button>
            <p className={styles.productStock}>Estoque: {produto.qtdEstoque}</p>
          </div>
        </div>
      </div>
      

    </div>
    )
}