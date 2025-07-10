
import React from 'react';
import AdminSidebar from '@/components/navigation/AdminSidebar';
import Navbar from '@/components/navigation/Navbar';

interface AdminLayoutProps {
  children: React.ReactNode;
  userName: string;
  onLogout: () => void;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, userName, onLogout }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        userRole="admin" 
        userName={userName} 
        onLogout={onLogout}
        unreadMessages={3}
      />
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
