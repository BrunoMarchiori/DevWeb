import React from "react";
import Header from "./components/Header/header";
import Footer from "./components/Footer/footer";

const App: React.FC = () => {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Header />
      <main className="container mt-5" style={{ flex: "1" }}>
        <p>Este é o conteúdo principal.</p>
      </main>
      <Footer />
    </div>
  );
};

export default App;
