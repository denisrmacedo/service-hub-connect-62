
import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import LoginForm from '@/components/auth/LoginForm';
import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm';
import AdminDashboard from '@/components/dashboard/AdminDashboard';
import ProviderDashboard from '@/components/dashboard/ProviderDashboard';
import ClientDashboard from '@/components/dashboard/ClientDashboard';
import AdminLayout from '@/components/layout/AdminLayout';
import Navbar from '@/components/navigation/Navbar';

const Index: React.FC = () => {
  const { user, login, logout, forgotPassword, isLoading } = useAuth();
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleForgotPassword = () => {
    setShowForgotPassword(true);
  };

  const handleBackToLogin = () => {
    setShowForgotPassword(false);
  };

  const handleForgotPasswordSubmit = async (email: string) => {
    await forgotPassword(email);
  };

  // Mostrar loading enquanto verifica usuário salvo
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    if (showForgotPassword) {
      return (
        <ForgotPasswordForm 
          onForgotPassword={handleForgotPasswordSubmit}
          onBackToLogin={handleBackToLogin}
        />
      );
    }
    
    return (
      <LoginForm 
        onLogin={login} 
        onForgotPassword={handleForgotPassword} 
      />
    );
  }

  // Render admin with special layout
  if (user.role === 'admin') {
    return (
      <AdminLayout userName={user.name} onLogout={logout}>
        <AdminDashboard />
      </AdminLayout>
    );
  }

  // Render other user types with regular navbar
  const renderDashboard = () => {
    switch (user.role) {
      case 'fornecedor':
        return <ProviderDashboard />;
      case 'cliente':
        return <ClientDashboard />;
      default:
        return <div>Tipo de usuário não reconhecido</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        userRole={user.role} 
        userName={user.name} 
        onLogout={logout}
        unreadMessages={user.role === 'fornecedor' ? 8 : 5}
      />
      {renderDashboard()}
    </div>
  );
};

export default Index;
