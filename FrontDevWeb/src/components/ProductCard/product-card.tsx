import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./product-card.module.css";

const ProductCard: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/product-details"); 
  };

  return (
    <div className={styles.card} onClick={handleClick} style={{ cursor: "pointer" }}>
      <img src="https://via.placeholder.com/400x240" alt="Product Image" />
      <div className={styles.price}>$49.99</div>
      <div className={styles.category}>Electronics</div>
    </div>
  );
};

export default ProductCard;