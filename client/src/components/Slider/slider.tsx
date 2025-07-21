import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductCard from "../ProductCard/product-card";
import { Produto } from "../../interfaces/interfaces";
import { useUser } from "../../contexts/UserContext";

interface CustomSliderProps {
  produtos: Produto[];
  onProductsChange?: () => void;
  onEditProduct?: (product: any) => void;
}

const CustomSlider: React.FC<CustomSliderProps> = ({ produtos, onProductsChange, onEditProduct }) => {
  const { usuario } = useUser();
  
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: Math.min(5, produtos.length),
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(3, produtos.length),
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: Math.min(2, produtos.length),
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const handleEdit = (product: any) => {
    if (onEditProduct) {
      onEditProduct(product);
    }
  };

  const handleDelete = async (productId: string) => {
    if (!usuario?.id) return;
    
    try {
      const response = await fetch(`http://localhost:8080/produtos/${productId}?usuarioId=${usuario.id}`, {
        method: 'DELETE',
      });

      if (response.ok && onProductsChange) {
        onProductsChange();
      } else {
        alert('Erro ao deletar produto');
      }
    } catch (error) {
      console.error('Erro ao deletar produto:', error);
      alert('Erro ao deletar produto');
    }
  };

  return (
    <Slider {...settings}>
      {produtos.map((produto) => (
        <div key={produto.id} style={{ padding: "0 10px" }}>
          <ProductCard 
            id={produto.id.toString()} 
            category={produto.categoria} 
            imageUrl={`http://localhost:8080/api/imagens/${produto.id}`}
            price={produto.preco}
            nome={produto.nome}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      ))}
    </Slider>
  );
};

export default CustomSlider;
