
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import LoginForm from '@/components/auth/LoginForm';
import AdminDashboard from '@/components/dashboard/AdminDashboard';
import ProviderDashboard from '@/components/dashboard/ProviderDashboard';
import ClientDashboard from '@/components/dashboard/ClientDashboard';
import AdminLayout from '@/components/layout/AdminLayout';
import Navbar from '@/components/navigation/Navbar';

const Index: React.FC = () => {
  const { user, login, logout } = useAuth();

  if (!user) {
    return <LoginForm onLogin={login} />;
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
