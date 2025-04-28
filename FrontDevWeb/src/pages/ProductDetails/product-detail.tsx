import Header from "../../components/Header/header";
import Footer from "../../components/Footer/footer";
import CustomSlider from "../../components/Slider/slider";
import ProductCard from "../../components/ProductCard/product-card";
import { useParams } from "react-router-dom";
import styles from "./product-detail.module.css"; // Importando o CSS do ProductDetails

const ProductDetails: React.FC = () => {
  
  var { id }  = useParams();
  
  return (
    <div className={styles.mainDiv}>
      <div className={styles.productDetails}>
        <ProductCard id={id ?? '1'} category="Eletronics" imageUrl="https://cdn.awsli.com.br/2500x2500/1113/1113512/produto/110434143/0fd759954d.jpg" price={50} key={id ?? '1'}/>
      </div>
      
      <div className={styles.sliderDiv}>
        <span>Produtos Relacionados</span>
        <CustomSlider items={10} />
      </div>
    </div>
  );
};

export default ProductDetails;



