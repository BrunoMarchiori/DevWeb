import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import styles from "./product-card.module.css";

interface ProductCardProps {
  id: string;
  imageUrl: string;
  price: number;
  category: string;
  nome?: string;
  onEdit?: (product: any) => void;
  onDelete?: (productId: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id, 
  imageUrl, 
  category, 
  price, 
  nome,
  onEdit,
  onDelete
}) => {
  const navigate = useNavigate();
  const { isGestorEmpresarial } = useUser();
  const [imagemError, setImagemError] = useState(false);

  const handleClick = () => {
    navigate(`product/${id}`); 
  };

  const handleImageError = () => {
    setImagemError(true);
  };

  const handleEdit = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onEdit) {
      try {
        // Buscar dados completos do produto
        const response = await fetch(`http://localhost:8080/produtos/${id}`);
        if (response.ok) {
          const produtoCompleto = await response.json();
          
          // Transformar a primeira categoria em formato adequado para o formulário
          const categoriaParaFormulario = produtoCompleto.categorias && produtoCompleto.categorias.length > 0
            ? { id: produtoCompleto.categorias[0].id, nome: produtoCompleto.categorias[0].nome }
            : { id: 0, nome: category };

          const produtoParaEdicao = {
            id: produtoCompleto.id,
            nome: produtoCompleto.nome,
            preco: produtoCompleto.preco,
            descricao: produtoCompleto.descricao || '',
            imagem: produtoCompleto.imagem || `http://localhost:8080/api/imagens/${produtoCompleto.id}`,
            categoria: categoriaParaFormulario,
            disponivel: produtoCompleto.disponivel || true,
            qtdEstoque: produtoCompleto.qtdEstoque || 0
          };
          
          onEdit(produtoParaEdicao);
        } else {
          // Fallback para dados básicos se não conseguir buscar
          onEdit({
            id: parseInt(id),
            nome,
            preco: price,
            descricao: '',
            imagem: imageUrl,
            categoria: { id: 0, nome: category },
            disponivel: true,
            qtdEstoque: 0
          });
        }
      } catch (error) {
        console.error('Erro ao buscar dados do produto:', error);
        // Fallback para dados básicos
        onEdit({
          id: parseInt(id),
          nome,
          preco: price,
          descricao: '',
          imagem: imageUrl,
          categoria: { id: 0, nome: category },
          disponivel: true,
          qtdEstoque: 0
        });
      }
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDelete && confirm('Tem certeza que deseja deletar este produto?')) {
      onDelete(id);
    }
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
      
      {isGestorEmpresarial() && (
        <div className={styles.adminActions}>
          <button 
            className={styles.editButton}
            onClick={handleEdit}
            title="Editar produto"
          >
            ✏️
          </button>
          <button 
            className={styles.deleteButton}
            onClick={handleDelete}
            title="Deletar produto"
          >
            🗑️
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductCard;