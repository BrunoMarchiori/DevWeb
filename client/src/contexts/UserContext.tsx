import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Usuario {
  id: number;
  nome: string;
  email: string;
  tipo: 'CLIENTE' | 'GESTOR_EMPRESARIAL';
  empresaColaboradoraId?: number;
  empresaColaboradoraNome?: string;
}

interface UserContextType {
  usuario: Usuario | null;
  login: (userId: number) => Promise<void>;
  logout: () => void;
  isGestorEmpresarial: () => boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser deve ser usado dentro de um UserProvider');
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  // Verificar se há um usuário logado no localStorage ao inicializar
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId && userId !== '0') {
      login(parseInt(userId));
    }
  }, []);

  const login = async (userId: number) => {
    try {
      const response = await fetch(`http://localhost:8080/autenticacao/${userId}`);
      if (response.ok) {
        const userData = await response.json();
        setUsuario(userData);
        localStorage.setItem('userId', userId.toString());
      }
    } catch (error) {
      console.error('Erro ao buscar dados do usuário:', error);
    }
  };

  const logout = () => {
    setUsuario(null);
    localStorage.removeItem('userId');
  };

  const isGestorEmpresarial = () => {
    return usuario?.tipo === 'GESTOR_EMPRESARIAL';
  };

  const value: UserContextType = {
    usuario,
    login,
    logout,
    isGestorEmpresarial
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
