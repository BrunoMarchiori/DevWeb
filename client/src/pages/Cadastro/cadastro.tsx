import React, { useState, useEffect } from 'react';
import { usuarioSchema, type UsuarioFormData, type UsuarioRegistroData } from '../../schemas/usuarioSchema';
import styles from './cadastro.module.css';

interface Empresa {
  id: number;
  nome: string;
}

const Cadastro: React.FC = () => {
  const [formData, setFormData] = useState<UsuarioFormData>({
    nome: '',
    endereco: '',
    telefone: '',
    email: '',
    senha: '',
    confirmaSenha: '',
    empresaId: undefined
  });

  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [generalError, setGeneralError] = useState('');

  // Carregar lista de empresas
  useEffect(() => {
    const carregarEmpresas = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/empresas');
        if (response.ok) {
          const empresasData = await response.json();
          setEmpresas(empresasData);
        }
      } catch (error) {
        console.error('Erro ao carregar empresas:', error);
      }
    };
    
    carregarEmpresas();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: name === 'empresaId' ? (value === '' ? undefined : Number(value)) : value 
    }));
    
    // Limpar erro do campo quando o usuário começar a digitar
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateEmail = async (email: string): Promise<boolean> => {
    try {
      const response = await fetch(`http://localhost:8080/api/usuario/verificar-email?email=${encodeURIComponent(email)}`);
      const data = await response.json();
      return !data.emailExiste;
    } catch (error) {
      console.error('Erro ao verificar email:', error);
      return true; // Permitir continuar em caso de erro na verificação
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setGeneralError('');
    setSuccessMessage('');
    setIsLoading(true);

    try {
      // Validação com Zod
      const validatedData = usuarioSchema.parse(formData);

      // Verificar se o email já existe
      const emailDisponivel = await validateEmail(validatedData.email);
      if (!emailDisponivel) {
        setErrors({ email: 'Este email já está cadastrado' });
        setIsLoading(false);
        return;
      }

      // Enviar dados para o servidor
      const dataToSend: UsuarioRegistroData = {
        nome: validatedData.nome,
        endereco: validatedData.endereco,
        email: validatedData.email,
        senha: validatedData.senha,
        confirmaSenha: validatedData.confirmaSenha,
        telefone: parseInt(validatedData.telefone),
        empresaId: validatedData.empresaId
      };

      const response = await fetch('http://localhost:8080/api/usuario/registro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccessMessage('Usuário cadastrado com sucesso!');
        setFormData({
          nome: '',
          endereco: '',
          telefone: '',
          email: '',
          senha: '',
          confirmaSenha: '',
          empresaId: undefined
        });
      } else {
        if (result.errors) {
          // Erros de validação do servidor
          setErrors(result.errors);
        } else if (result.error) {
          // Erro geral do servidor
          setGeneralError(result.error);
        } else {
          setGeneralError('Erro ao cadastrar usuário. Tente novamente.');
        }
      }
    } catch (error: any) {
      if (error.errors) {
        // Erros de validação do Zod
        const zodErrors: Record<string, string> = {};
        error.errors.forEach((err: any) => {
          zodErrors[err.path[0]] = err.message;
        });
        setErrors(zodErrors);
      } else {
        setGeneralError('Erro ao processar formulário. Verifique os dados e tente novamente.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles['cadastro-container']}>
      <h1 className={styles['cadastro-title']}>Cadastro de Usuário</h1>
      
      {successMessage && (
        <div className={styles['success-message']}>
          {successMessage}
        </div>
      )}

      {generalError && (
        <div className={styles['general-error']}>
          {generalError}
        </div>
      )}

      <form onSubmit={handleSubmit} className={styles['cadastro-form']}>
        <div className={styles['form-group']}>
          <label htmlFor="nome" className={styles['form-label']}>Nome *</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={formData.nome}
            onChange={handleInputChange}
            className={`${styles['form-input']} ${errors.nome ? styles.error : ''}`}
            placeholder="Digite seu nome completo"
          />
          {errors.nome && <span className={styles['error-message']}>{errors.nome}</span>}
        </div>

        <div className={styles['form-group']}>
          <label htmlFor="endereco" className={styles['form-label']}>Endereço *</label>
          <input
            type="text"
            id="endereco"
            name="endereco"
            value={formData.endereco}
            onChange={handleInputChange}
            className={`${styles['form-input']} ${errors.endereco ? styles.error : ''}`}
            placeholder="Digite seu endereço completo"
          />
          {errors.endereco && <span className={styles['error-message']}>{errors.endereco}</span>}
        </div>

        <div className={styles['form-group']}>
          <label htmlFor="telefone" className={styles['form-label']}>Telefone *</label>
          <input
            type="tel"
            id="telefone"
            name="telefone"
            value={formData.telefone}
            onChange={handleInputChange}
            className={`${styles['form-input']} ${errors.telefone ? styles.error : ''}`}
            placeholder="Digite seu telefone (somente números)"
          />
          {errors.telefone && <span className={styles['error-message']}>{errors.telefone}</span>}
        </div>

        <div className={styles['form-group']}>
          <label htmlFor="email" className={styles['form-label']}>Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`${styles['form-input']} ${errors.email ? styles.error : ''}`}
            placeholder="Digite seu email"
          />
          {errors.email && <span className={styles['error-message']}>{errors.email}</span>}
        </div>

        <div className={styles['form-group']}>
          <label htmlFor="empresaId" className={styles['form-label']}>Empresa (opcional)</label>
          <select
            id="empresaId"
            name="empresaId"
            value={formData.empresaId || ''}
            onChange={handleInputChange}
            className={`${styles['form-input']} ${errors.empresaId ? styles.error : ''}`}
          >
            <option value="">Selecione uma empresa (se aplicável)</option>
            {empresas.map((empresa) => (
              <option key={empresa.id} value={empresa.id}>
                {empresa.nome}
              </option>
            ))}
          </select>
          <div className={styles['help-text']}>
            💼 Se você trabalha em uma empresa, selecione-a para se tornar um Gestor Empresarial
          </div>
          {errors.empresaId && <span className={styles['error-message']}>{errors.empresaId}</span>}
        </div>

        <div className={styles['form-group']}>
          <label htmlFor="senha" className={styles['form-label']}>Senha *</label>
          <input
            type="password"
            id="senha"
            name="senha"
            value={formData.senha}
            onChange={handleInputChange}
            className={`${styles['form-input']} ${errors.senha ? styles.error : ''}`}
            placeholder="Digite sua senha (mínimo 6 caracteres)"
          />
          {errors.senha && <span className={styles['error-message']}>{errors.senha}</span>}
        </div>

        <div className={styles['form-group']}>
          <label htmlFor="confirmaSenha" className={styles['form-label']}>Confirmar Senha *</label>
          <input
            type="password"
            id="confirmaSenha"
            name="confirmaSenha"
            value={formData.confirmaSenha}
            onChange={handleInputChange}
            className={`${styles['form-input']} ${errors.confirmaSenha ? styles.error : ''}`}
            placeholder="Confirme sua senha"
          />
          {errors.confirmaSenha && <span className={styles['error-message']}>{errors.confirmaSenha}</span>}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={styles['submit-button']}
        >
          {isLoading && <span className={styles.loading}></span>}
          {isLoading ? 'Cadastrando...' : 'Cadastrar'}
        </button>
      </form>

      <div className={styles['login-link']}>
        Já possui uma conta? <a href="/login">Faça login</a>
      </div>
    </div>
  );
};

export default Cadastro;
