import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductCard from "../ProductCard/product-card";

interface CustomSliderProps {
  items: number;
}

const CustomSlider: React.FC<CustomSliderProps> = ({ items }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
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
      {[...Array(items)].map((_, index) => (
        <div key={index} style={{ padding: "0 10px" }}>
          <ProductCard id={index.toString()} category="Eletronics" imageUrl="https://cdn.awsli.com.br/2500x2500/1113/1113512/produto/110434143/0fd759954d.jpg" price={50} key={index}/>
        </div>
      ))}
    </Slider>
  );
};

export default CustomSlider;
