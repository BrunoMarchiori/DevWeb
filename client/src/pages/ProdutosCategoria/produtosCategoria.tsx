import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../../api/api'; // Sua instância do Axios
import { Categoria, Produto } from '../../interfaces/interfaces';
import ProductCard from '../../components/ProductCard/product-card'; // Reutiliza seu componente de card

import styles from './produtosCategoria.module.css'; // CSS específico para esta página

// Interface para os dados da categoria que vamos buscar

export default function VerTodosPage() {
  // 1. Pega o ID da categoria a partir da URL (ex: /categoria/4 -> categoryId será "4")
  const { categoryName } = useParams();

  // 2. Estados para armazenar os dados, carregamento e erros
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [categoria, setCategoria] = useState<Categoria | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 3. Efeito para buscar os dados da API quando o componente monta ou o ID muda
    useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await fetch('http://localhost:8080/categorias');
        const data: Categoria[] = await response.json();
        const categoriaEncontrada = data.find(c => c.nome.toLowerCase() === categoryName?.toLowerCase());
        console.log('Dados das categorias:', data);
        console.log('Categoria encontrada:', categoriaEncontrada);
        if (categoriaEncontrada) {
          setCategoria(categoriaEncontrada);
          setProdutos(categoriaEncontrada.produtos);
        } else {
          setError('Categoria não encontrada');
        }
      } catch (error) {
        console.error('Erro ao buscar categorias:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategorias();
  }, []);



  // 4. Renderização condicional para o estado de carregamento
  if (isLoading) {
    return <div className={styles.feedbackState}>Carregando produtos...</div>;
  }

  // 5. Renderização condicional para o estado de erro
  if (error) {
    return <div className={styles.feedbackState}>{error}</div>;
  }

  // 6. Renderização principal com os produtos
  return (
    <div className={styles.verTodosPageContainer}>
      <header className={styles.pageHeader}>
        <Link to="/" className={styles.breadcrumb}>
          &larr; Voltar para a Home
        </Link>
        <h1 className={styles.pageTitle}>{categoria?.nome}</h1>
      </header>

      {produtos.length > 0 ? (
        <div className={styles.cardsWrapper}>
          {produtos.map((produto) => (
            <ProductCard
              key={produto.id}
              id={produto.id.toString()}
              category={produto.categoria}
              imageUrl={`http://localhost:8080/api/imagens/${produto.id}`}
              price={produto.preco}
              nome={produto.nome}
            />
          ))}
        </div>
      ) : (
        <p className={styles.feedbackState}>Nenhum produto encontrado nesta categoria.</p>
      )}
    </div>
  );
}