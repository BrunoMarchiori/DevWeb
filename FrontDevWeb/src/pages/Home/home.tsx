import React from "react";
import Header from "../../components/Header/header";
import Footer from "../../components/Footer/footer";
import ProductCard from "../../components/ProductCard/product-card";

const HomePage: React.FC = () => {
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
      <main style={{ flex: "1", padding: "10px" }}>
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
