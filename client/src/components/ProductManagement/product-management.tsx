import React, { useState, useEffect } from 'react';
import { useUser } from '../../contexts/UserContext';
import styles from './product-management.module.css';

interface Produto {
  id?: number;
  nome: string;
  preco: number;
  descricao: string;
  imagem: string;
  categoria: { id: number; nome: string };
  disponivel: boolean;
  qtdEstoque?: number;
}

interface Categoria {
  id: number;
  nome: string;
}

interface ProductManagementProps {
  onProductsChange: () => void;
  categorias: Categoria[];
  editingProduct?: Produto | null;
  onClearEdit?: () => void;
}

const ProductManagement: React.FC<ProductManagementProps> = ({ 
  onProductsChange, 
  categorias, 
  editingProduct: externalEditingProduct,
  onClearEdit 
}) => {
  const { usuario } = useUser();
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Produto | null>(null);
  const [formData, setFormData] = useState<Produto>({
    nome: '',
    preco: 0.1,
    descricao: '',
    imagem: '',
    categoria: { id: 0, nome: '' },
    disponivel: true,
    qtdEstoque: 0
  });

  // Effect para detectar quando um produto externo está sendo editado
  useEffect(() => {
    if (externalEditingProduct) {
      setEditingProduct(externalEditingProduct);
      // Encontrar a categoria correspondente
      const categoria = categorias.find(cat => 
        cat.nome === externalEditingProduct.categoria?.nome || 
        cat.id === externalEditingProduct.categoria?.id
      );
      
      setFormData({
        ...externalEditingProduct,
        categoria: categoria || { id: 0, nome: externalEditingProduct.categoria?.nome || '' },
        // Garantir que a imagem tenha a URL completa
        imagem: externalEditingProduct.imagem || `http://localhost:8080/api/imagens/${externalEditingProduct.id}`,
        // Garantir valores padrão para campos obrigatórios
        qtdEstoque: externalEditingProduct.qtdEstoque || 0,
        preco: externalEditingProduct.preco || 0.1
      });
      setShowForm(true);
    }
  }, [externalEditingProduct, categorias]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'categoria') {
      const selectedCategoria = categorias.find(cat => cat.id === parseInt(value));
      setFormData(prev => ({
        ...prev,
        categoria: selectedCategoria || { id: 0, nome: '' }
      }));
    } else if (name === 'preco') {
      setFormData(prev => ({ ...prev, [name]: parseFloat(value) || 0.1 }));
    } else if (name === 'qtdEstoque') {
      setFormData(prev => ({ ...prev, [name]: parseInt(value) || 0 }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!usuario?.id) return;

    // Validar dados obrigatórios antes de enviar
    if (!formData.nome.trim()) {
      alert('Nome é obrigatório');
      return;
    }
    
    if (!formData.imagem.trim()) {
      alert('URL da imagem é obrigatória');
      return;
    }
    
    if (formData.preco < 0.1) {
      alert('Preço deve ser maior ou igual a 0.1');
      return;
    }
    
    if (formData.qtdEstoque === undefined || formData.qtdEstoque < 0) {
      alert('Quantidade em estoque deve ser informada e maior ou igual a 0');
      return;
    }
    
    if (!formData.categoria.id) {
      alert('Categoria é obrigatória');
      return;
    }

    try {
      const url = editingProduct 
        ? `http://localhost:8080/produtos?usuarioId=${usuario.id}`
        : `http://localhost:8080/produtos?usuarioId=${usuario.id}`;
      
      const method = editingProduct ? 'PUT' : 'POST';
      
      // Preparar dados para envio
      const { categoria, ...restFormData } = formData;
      const dataToSend = {
        ...restFormData,
        categorias: [{ id: categoria.id }], // Backend espera um array de categorias
        id: editingProduct?.id
      };
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        setShowForm(false);
        setEditingProduct(null);
        setFormData({
          nome: '',
          preco: 0.1,
          descricao: '',
          imagem: '',
          categoria: { id: 0, nome: '' },
          disponivel: true,
          qtdEstoque: 0
        });
        if (onClearEdit) {
          onClearEdit();
        }
        onProductsChange();
      } else {
        const errorData = await response.json();
        alert(`Erro ao salvar produto: ${errorData.message || 'Erro desconhecido'}`);
      }
    } catch (error) {
      console.error('Erro ao salvar produto:', error);
      alert('Erro ao salvar produto');
    }
  };

  const handleEdit = (produto: Produto) => {
    setEditingProduct(produto);
    setFormData(produto);
    setShowForm(true);
  };

  const handleDelete = async (produtoId: number) => {
    if (!usuario?.id || !confirm('Tem certeza que deseja deletar este produto?')) return;

    try {
      const response = await fetch(`http://localhost:8080/produtos/${produtoId}?usuarioId=${usuario.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        onProductsChange();
      } else {
        alert('Erro ao deletar produto');
      }
    } catch (error) {
      console.error('Erro ao deletar produto:', error);
      alert('Erro ao deletar produto');
    }
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingProduct(null);
    setFormData({
      nome: '',
      preco: 0.1,
      descricao: '',
      imagem: '',
      categoria: { id: 0, nome: '' },
      disponivel: true,
      qtdEstoque: 0
    });
    if (onClearEdit) {
      onClearEdit();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>🛠️ Gerenciamento de Produtos</h2>
        <button 
          className={styles.addButton}
          onClick={() => setShowForm(true)}
        >
          ➕ Adicionar Produto
        </button>
      </div>

      {showForm && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>{editingProduct ? 'Editar Produto' : 'Novo Produto'}</h3>
            
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label>Nome:</label>
                <input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>Preço:</label>
                <input
                  type="number"
                  name="preco"
                  value={formData.preco}
                  onChange={handleInputChange}
                  step="0.01"
                  min="0.1"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>Quantidade em Estoque:</label>
                <input
                  type="number"
                  name="qtdEstoque"
                  value={formData.qtdEstoque || 0}
                  onChange={handleInputChange}
                  min="0"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>Descrição:</label>
                <textarea
                  name="descricao"
                  value={formData.descricao}
                  onChange={handleInputChange}
                  rows={3}
                />
              </div>

              <div className={styles.formGroup}>
                <label>URL da Imagem:</label>
                <input
                  type="url"
                  name="imagem"
                  value={formData.imagem}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>Categoria:</label>
                <select
                  name="categoria"
                  value={formData.categoria.id}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Selecione uma categoria</option>
                  {categorias.map(categoria => (
                    <option key={categoria.id} value={categoria.id}>
                      {categoria.nome}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.formActions}>
                <button type="submit" className={styles.saveButton}>
                  {editingProduct ? 'Atualizar' : 'Salvar'}
                </button>
                <button type="button" onClick={resetForm} className={styles.cancelButton}>
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManagement;
