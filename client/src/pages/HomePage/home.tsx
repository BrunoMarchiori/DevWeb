import { useEffect, useState } from "react";
import CustomSlider from "../../components/Slider/slider";
import ProductManagement from "../../components/ProductManagement/product-management";
import { useUser } from "../../contexts/UserContext";
import styles from "./home.module.css";
import { Categoria } from "../../interfaces/interfaces";

const HomePage: React.FC = () => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const { isGestorEmpresarial } = useUser();

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

  useEffect(() => {
    fetchCategorias();
  }, []);

  const handleProductsChange = () => {
    fetchCategorias(); // Recarregar categorias quando produtos mudarem
  };

  const handleEditProduct = (product: any) => {
    setEditingProduct(product);
  };

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
      
      {isGestorEmpresarial() && (
        <ProductManagement 
          onProductsChange={handleProductsChange}
          categorias={categorias.map(cat => ({ id: cat.id, nome: cat.nome }))}
          editingProduct={editingProduct}
          onClearEdit={() => setEditingProduct(null)}
        />
      )}
      
      <div className={styles.sliderDiv}>
        
        {categorias.map((categoria) => (
          <div key={categoria.id} className={styles.categorySection}>
            <span className={styles.categoryTitle}>{categoria.nome}</span>
            <CustomSlider 
              produtos={categoria.produtos}
              onProductsChange={handleProductsChange}
              onEditProduct={handleEditProduct}
              seeAllLink={categoria.nome}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
