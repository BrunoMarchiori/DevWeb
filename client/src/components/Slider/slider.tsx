import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom"; // 👈 1. Importe o Link
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductCard from "../ProductCard/product-card";
import { Produto } from "../../interfaces/interfaces";
import s from "./slider.module.css"; // 👈 2. Importe um arquivo CSS para os novos estilos

interface CustomSliderProps {
  produtos: Produto[];
  seeAllLink: string;
}

const CustomSlider: React.FC<CustomSliderProps> = ({ produtos, seeAllLink }) => {
  const settings = {
    dots: false,
    infinite: produtos.length > 5, // Só permite infinito se houver mais slides que o visível
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
          slidesToScroll: 1,
        },
      },
    ],
  };

  // Não renderiza o slider se não houver produtos
  if (!produtos || produtos.length === 0) {
    return null;
  }

  return (
    // 3. Crie um container geral para o título e o slider
    <div className={s.sliderwrapper}>
      {/* 4. Adicione um cabeçalho com o título e o botão "Ver todos" */}
      <div className={s.sliderheader}>
        <h2 className={s.slidertitle}>{''}</h2>
        <Link to={`/produtoCategoria/${seeAllLink}`} className={s.seealllink}>
          Ver todos
        </Link>
      </div>

      {/* 5. Mantenha seu componente Slider como estava */}
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
    </div>
  );
};

export default CustomSlider;