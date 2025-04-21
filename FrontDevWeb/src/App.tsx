import React from "react";
import Header from "./components/Header/header";
import Footer from "./components/Footer/footer";
import ProductCard from "./components/ProductCard/product-card";
const App: React.FC = () => {
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
      <main style={{ flex: "1" }}>
        <ProductCard />
      </main>
      <Footer />
    </div>
  );
};

export default App;
