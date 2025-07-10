
import React from 'react';
import { AuthProvider, useAuth } from '@/hooks/useAuth';
import LoginForm from '@/components/auth/LoginForm';
import AdminDashboard from '@/components/dashboard/AdminDashboard';
import ProviderDashboard from '@/components/dashboard/ProviderDashboard';
import ClientDashboard from '@/components/dashboard/ClientDashboard';
import Navbar from '@/components/navigation/Navbar';
import { useToast } from '@/hooks/use-toast';

const AppContent: React.FC = () => {
  const { user, login, logout, forgotPassword } = useAuth();
  const { toast } = useToast();

  const handleLogin = async (email: string, password: string, remember: boolean) => {
    try {
      await login(email, password, remember);
      toast({
        title: "Login realizado com sucesso!",
        description: "Bem-vindo ao ServiceHub",
      });
    } catch (error) {
      toast({
        title: "Erro no login",
        description: "Verifique suas credenciais e tente novamente",
        variant: "destructive"
      });
    }
  };

  const handleForgotPassword = async (email: string) => {
    try {
      await forgotPassword(email);
      toast({
        title: "Email enviado!",
        description: "Verifique sua caixa de entrada para redefinir sua senha",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível enviar o email de recuperação",
        variant: "destructive"
      });
    }
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Logout realizado",
      description: "Até a próxima!",
    });
  };

  if (!user) {
    return (
      <LoginForm 
        onLogin={handleLogin}
        onForgotPassword={handleForgotPassword}
      />
    );
  }

  const renderDashboard = () => {
    switch (user.role) {
      case 'admin':
        return <AdminDashboard />;
      case 'fornecedor':
        return <ProviderDashboard />;
      case 'cliente':
        return <ClientDashboard />;
      default:
        return <div>Role não reconhecido</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        userRole={user.role}
        userName={user.name}
        onLogout={handleLogout}
        unreadMessages={user.role === 'fornecedor' ? 3 : user.role === 'cliente' ? 1 : 0}
      />
      {renderDashboard()}
    </div>
  );
};

const Index: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default Index;
