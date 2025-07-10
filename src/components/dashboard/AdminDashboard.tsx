
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, FileText, MessageSquare, Settings, Eye, EyeOff, UserCheck, UserX } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'cliente' | 'fornecedor';
  status: 'ativo' | 'inativo';
  createdAt: string;
}

interface Advertisement {
  id: string;
  title: string;
  description: string;
  provider: string;
  status: 'ativo' | 'inativo';
  createdAt: string;
}

const AdminDashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([
    { id: '1', name: 'João Silva', email: 'joao@email.com', role: 'cliente', status: 'ativo', createdAt: '2024-01-15' },
    { id: '2', name: 'Maria Santos', email: 'maria@email.com', role: 'fornecedor', status: 'ativo', createdAt: '2024-01-10' },
    { id: '3', name: 'Pedro Costa', email: 'pedro@email.com', role: 'fornecedor', status: 'inativo', createdAt: '2024-01-05' }
  ]);

  const [advertisements, setAdvertisements] = useState<Advertisement[]>([
    { id: '1', title: 'Limpeza Residencial', description: 'Serviço completo de limpeza', provider: 'Maria Santos', status: 'ativo', createdAt: '2024-01-12' },
    { id: '2', title: 'Consultoria TI', description: 'Consultoria em tecnologia', provider: 'Pedro Costa', status: 'inativo', createdAt: '2024-01-08' }
  ]);

  const toggleUserStatus = (userId: string) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'ativo' ? 'inativo' : 'ativo' }
        : user
    ));
  };

  const toggleAdStatus = (adId: string) => {
    setAdvertisements(advertisements.map(ad => 
      ad.id === adId 
        ? { ...ad, status: ad.status === 'ativo' ? 'inativo' : 'ativo' }
        : ad
    ));
  };

  const stats = [
    { title: 'Total de Usuários', value: users.length, icon: Users, color: 'from-blue-500 to-blue-600' },
    { title: 'Anúncios Ativos', value: advertisements.filter(ad => ad.status === 'ativo').length, icon: FileText, color: 'from-green-500 to-green-600' },
    { title: 'Fornecedores', value: users.filter(u => u.role === 'fornecedor').length, icon: UserCheck, color: 'from-purple-500 to-purple-600' },
    { title: 'Clientes', value: users.filter(u => u.role === 'cliente').length, icon: MessageSquare, color: 'from-orange-500 to-orange-600' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard Administrativo</h1>
            <p className="text-gray-600">Gerencie usuários e anúncios da plataforma</p>
          </div>
          <Button className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
            <Settings className="w-4 h-4 mr-2" />
            Configurações
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="overflow-hidden border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-full bg-gradient-to-r ${stat.color}`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Users Management */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="w-5 h-5 mr-2" />
              Gerenciar Usuários
            </CardTitle>
            <CardDescription>
              Visualize e gerencie todos os usuários da plataforma
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Nome</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Email</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Tipo</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">{user.name}</td>
                      <td className="py-3 px-4 text-gray-600">{user.email}</td>
                      <td className="py-3 px-4">
                        <Badge variant={user.role === 'fornecedor' ? 'default' : 'secondary'}>
                          {user.role}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant={user.status === 'ativo' ? 'default' : 'destructive'}>
                          {user.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toggleUserStatus(user.id)}
                          className="mr-2"
                        >
                          {user.status === 'ativo' ? (
                            <UserX className="w-4 h-4 mr-1" />
                          ) : (
                            <UserCheck className="w-4 h-4 mr-1" />
                          )}
                          {user.status === 'ativo' ? 'Desativar' : 'Ativar'}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Advertisements Management */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="w-5 h-5 mr-2" />
              Gerenciar Anúncios
            </CardTitle>
            <CardDescription>
              Controle todos os anúncios publicados na plataforma
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Título</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Fornecedor</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Data</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {advertisements.map((ad) => (
                    <tr key={ad.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">{ad.title}</td>
                      <td className="py-3 px-4 text-gray-600">{ad.provider}</td>
                      <td className="py-3 px-4">
                        <Badge variant={ad.status === 'ativo' ? 'default' : 'destructive'}>
                          {ad.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-gray-600">{ad.createdAt}</td>
                      <td className="py-3 px-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toggleAdStatus(ad.id)}
                          className="mr-2"
                        >
                          {ad.status === 'ativo' ? (
                            <EyeOff className="w-4 h-4 mr-1" />
                          ) : (
                            <Eye className="w-4 h-4 mr-1" />
                          )}
                          {ad.status === 'ativo' ? 'Desativar' : 'Ativar'}
                        </Button>
                        <Button variant="outline" size="sm">
                          Editar
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
