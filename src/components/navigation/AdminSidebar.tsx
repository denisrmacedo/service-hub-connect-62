
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Users, FileText, UserCheck, Home } from 'lucide-react';

const AdminSidebar: React.FC = () => {
  const menuItems = [
    { path: '/admin', label: 'Dashboard', icon: Home },
    { path: '/admin/fornecedores', label: 'Fornecedores', icon: UserCheck },
    { path: '/admin/anuncios', label: 'Anúncios', icon: FileText },
    { path: '/admin/clientes', label: 'Clientes', icon: Users },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 shadow-sm">
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-red-500 to-pink-500 flex items-center justify-center">
            <span className="text-white font-bold text-sm">SH</span>
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">Admin Panel</h2>
            <p className="text-xs text-gray-500">ServiceHub</p>
          </div>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-50 to-green-50 text-blue-700 border border-blue-200'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default AdminSidebar;
