
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'cliente' | 'fornecedor';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, remember: boolean) => Promise<void>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Verificar se existe um usuário salvo no localStorage ao inicializar
  useEffect(() => {
    const checkRememberedUser = () => {
      try {
        const rememberedUser = localStorage.getItem('rememberedUser');
        if (rememberedUser) {
          const userData = JSON.parse(rememberedUser);
          console.log('Usuario lembrado encontrado:', userData);
          setUser(userData);
        }
      } catch (error) {
        console.error('Erro ao recuperar usuário salvo:', error);
        // Limpar localStorage se houver erro na leitura
        localStorage.removeItem('rememberedUser');
      } finally {
        setIsLoading(false);
      }
    };

    checkRememberedUser();
  }, []);

  const login = async (email: string, password: string, remember: boolean) => {
    setIsLoading(true);
    
    // Simulação de login - substituir pela integração com Supabase
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock user based on email for demo
    let mockUser: User;
    if (email.includes('admin')) {
      mockUser = { id: '1', name: 'Admin User', email, role: 'admin' };
    } else if (email.includes('fornecedor')) {
      mockUser = { id: '2', name: 'Maria Santos', email, role: 'fornecedor' };
    } else {
      mockUser = { id: '3', name: 'João Cliente', email, role: 'cliente' };
    }
    
    setUser(mockUser);
    
    if (remember) {
      console.log('Salvando usuário no localStorage:', mockUser);
      localStorage.setItem('rememberedUser', JSON.stringify(mockUser));
    } else {
      // Se não marcou "lembrar", remover dados salvos anteriormente
      localStorage.removeItem('rememberedUser');
    }
    
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('rememberedUser');
    console.log('Usuário deslogado e dados removidos do localStorage');
  };

  const forgotPassword = async (email: string) => {
    setIsLoading(true);
    // Implementar lógica de recuperação de senha com Supabase
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Password reset email sent to:', email);
    setIsLoading(false);
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      forgotPassword,
      isLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
};
