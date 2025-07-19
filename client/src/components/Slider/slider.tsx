import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductCard from "../ProductCard/product-card";

interface Produto {
  id: number;
  nome: string;
  preco: number;
  imagem: string;
  categoria: string;
}

interface CustomSliderProps {
  produtos: Produto[];
}

const CustomSlider: React.FC<CustomSliderProps> = ({ produtos }) => {
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
          />
        </div>
      ))}
    </Slider>
  );
};

export default CustomSlider;
