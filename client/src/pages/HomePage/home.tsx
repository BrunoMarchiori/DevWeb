import { useEffect, useState } from "react";
import CustomSlider from "../../components/Slider/slider";
import styles from "./home.module.css";
import { Categoria } from "../../interfaces/interfaces";





const HomePage: React.FC = () => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await fetch('http://localhost:8080/categorias');
        const data: Categoria[] = await response.json();
        setCategorias(data);
      } catch (error) {
        console.error('Erro ao buscar categorias:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategorias();
  }, []);

  if (loading) {
    return (
      <div className={styles.mainDiv}>
        <h1>Trabalho de Luiz Felipe Alves e Bruno Marchiori</h1>
        <div>Carregando categorias...</div>
      </div>
    );
  }

  return (
    <div className={styles.mainDiv}>
      <h1>Trabalho de Luiz Felipe Alves e Bruno Marchiori</h1>
      <div className={styles.sliderDiv}>
        {categorias.map((categoria) => (
          <div key={categoria.id} className={styles.categorySection}>
            <span className={styles.categoryTitle}>{categoria.nome}</span>
            <CustomSlider produtos={categoria.produtos} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
