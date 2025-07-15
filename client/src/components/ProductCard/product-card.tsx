import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./product-card.module.css";

interface ProductCardProps {
  id: string;
  imageUrl: string;
  price: number;
  category: string;
}


const ProductCard: React.FC<ProductCardProps> = ({id, imageUrl, category, price}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`product/${id}`); 
  };

  return (
    <div className={styles.card} onClick={handleClick} style={{ cursor: "pointer" }}>
      <img src={imageUrl} alt="Product Image" />
      <div className={styles.price}>{price}</div>
      <div className={styles.category}>{category}</div>
    </div>
  );
};

export default ProductCard;