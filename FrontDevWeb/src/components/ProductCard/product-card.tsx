import React from "react";
import styles from "./product-card.module.css";

const ProductCard: React.FC = () => {
  return (
    <div className={styles.card}>
      <img src="https://via.placeholder.com/400x240" alt="Product Image" />
      <div className={styles.price}>$49.99</div>
      <div className={styles.category}>Electronics</div>
    </div>
  );
};

export default ProductCard;
