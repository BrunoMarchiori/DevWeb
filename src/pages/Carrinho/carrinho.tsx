
import ProductCard from '../../components/ProductCard/product-card';
import styles from './carrinho.module.css';



export default function Carrinho() {
  
    return (
    <div className={styles.carrinho_div}>
        <h1>Carrinho</h1>
        <div>
            <div  style={{ padding: "0 10px", marginBottom: "20px" }}>
                <ProductCard id={'1'} category="Eletronics" imageUrl="https://cdn.awsli.com.br/2500x2500/1113/1113512/produto/110434143/0fd759954d.jpg" price={50} />
            </div>
            <div  style={{ padding: "0 10px", marginBottom: "20px" }}>
                <ProductCard id={'1'} category="Eletronics" imageUrl="https://cdn.awsli.com.br/2500x2500/1113/1113512/produto/110434143/0fd759954d.jpg" price={50} />
            </div>
            <div  style={{ padding: "0 10px", marginBottom: "20px" }}>
                <ProductCard id={'1'} category="Eletronics" imageUrl="https://cdn.awsli.com.br/2500x2500/1113/1113512/produto/110434143/0fd759954d.jpg" price={50} />
            </div>
        </div>
        <button>Finalizar Compra</button>
    </div>
  );
}