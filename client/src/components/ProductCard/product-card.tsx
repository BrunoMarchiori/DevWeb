import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./product-card.module.css";

interface ProductCardProps {
  id: string;
  imageUrl: string;
  price: number;
  category: string;
  nome?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({id, imageUrl, category, price, nome}) => {
  const navigate = useNavigate();
  const [imagemError, setImagemError] = useState(false);

  const handleClick = () => {
    navigate(`product/${id}`); 
  };

  const handleImageError = () => {
    setImagemError(true);
  };

  const placeholderUrl = `https://via.placeholder.com/300x200/e0e0e0/666666?text=${encodeURIComponent(nome || 'Produto')}`;

  return (
    <div className={styles.card} onClick={handleClick} style={{ cursor: "pointer" }}>
      <img 
        src={imagemError ? placeholderUrl : imageUrl} 
        alt={nome || "Product Image"} 
        onError={handleImageError}
        loading="lazy"
      />
      <div className={styles.productName}>{nome}</div>
      <div className={styles.price}>R$ {price?.toFixed(2)}</div>
      <div className={styles.category}>{category}</div>
    </div>
  );
};

export default ProductCard;