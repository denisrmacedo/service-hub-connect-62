
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import AdminLayout from '@/components/layout/AdminLayout';
import UsersList from '@/components/admin/UsersList';

const AdminUsers: React.FC = () => {
  const { user, logout } = useAuth();

  // Redirecionar se não for admin
  if (!user || user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return (
    <AdminLayout userName={user.name} onLogout={logout}>
      <UsersList />
    </AdminLayout>
  );
};

export default AdminUsers;
