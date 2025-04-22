import Header from "../../components/Header/header";
import Footer from "../../components/Footer/footer";
import CustomSlider from "../../components/Slider/slider";

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
      <div></div>
      <main style={{ flex: "1", padding: "0 50px" }}>
        <span>Eletronicos</span>
        <CustomSlider items={10} />
        <span>Eletronicos</span>
        <CustomSlider items={10} />
        <span>Eletronicos</span>
        <CustomSlider items={10} />
        <span>Eletronicos</span>
        <CustomSlider items={10} />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
