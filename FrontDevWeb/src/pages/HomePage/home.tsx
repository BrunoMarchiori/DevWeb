import CustomSlider from "../../components/Slider/slider";
import styles from "./home.module.css"; // Importando o CSS do HomePage

const HomePage: React.FC = () => {
  return (
    <div className={styles.mainDiv}>
      
      <div className={styles.sliderDiv}>
          <span>Eletronicos</span>
          <CustomSlider items={10} />
          <span>Eletronicos</span>
          <CustomSlider items={10} />
          <span>Eletronicos</span>
          <CustomSlider items={10} />
          <span>Eletronicos</span>
          <CustomSlider items={10} />
        </div>
    </div>
  );
};

export default HomePage;
