import CustomSlider from "../../components/Slider/slider";
import ProductCard from "../../components/ProductCard/product-card";
import { useParams } from "react-router-dom";
import styles from "./product-detail.module.css"; // Importando o CSS do ProductDetails
import { Produto } from "../../interfaces/interfaces";
import { use, useState } from "react";
import { api } from "../../api/api";
import { useQuery } from "@tanstack/react-query";
import ProductDetailCard from "../../components/ProductDetailCard/productDetailCard";

const ProductDetails: React.FC = () => {

  const { id } = useParams<{ id: string }>();

  
  const { 
    data: produto, 
    error, 
    isLoading 
  } = useQuery<Produto>({
    
    queryKey: ['produto', id], 
    
   
    queryFn: async () => {
      
      const response = await api.get(`produtos/${id}`);
      return response.data;
    },

    enabled: !!id, 
  });


  if (isLoading) {
    return (
      <div className={styles.mainDiv}>
        <div>Carregando detalhes do produto...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.mainDiv}>
        <div>Erro ao carregar o produto: {error.message}</div>
      </div>
    );
  }
  

  if (!produto) {
    return (
      <div className={styles.mainDiv}>
        <div>Produto não encontrado.</div>
      </div>
    )
  }

  return (
    <div className={styles.mainDiv}>
      <ProductDetailCard produto={produto}></ProductDetailCard>
      <div className={styles.sliderDiv}>
        <span>Produtos Relacionados</span>
        {/* <CustomSlider produtos={produtosRelacionados} /> */}
      </div>
    </div>

  );
};

export default ProductDetails;


