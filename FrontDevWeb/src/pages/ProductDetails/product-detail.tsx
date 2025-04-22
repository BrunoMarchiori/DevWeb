import Header from "../../components/Header/header";
import Footer from "../../components/Footer/footer";
import CustomSlider from "../../components/Slider/slider";
import ProductCard from "../../components/ProductCard/product-card";

const ProductDetails: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#989898",
      }}
    >
      <Header />
      <div></div>
      <main style={{ flex: "1", padding: "0 50px" }}>
        <ProductCard />
      </main>
      <span>Produtos Relacionados</span>
      <CustomSlider items={10} />
      <Footer />
    </div>
  );
};

export default ProductDetails;
