
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
    <div className="p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard Administrativo</h1>
            <p className="text-gray-600">Visão geral da plataforma</p>
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

        {/* Recent Activity Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Users */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Usuários Recentes
              </CardTitle>
              <CardDescription>
                Últimos usuários cadastrados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {users.slice(0, 3).map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={user.role === 'fornecedor' ? 'default' : 'secondary'}>
                        {user.role}
                      </Badge>
                      <Badge variant={user.status === 'ativo' ? 'default' : 'destructive'}>
                        {user.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Advertisements */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                Anúncios Recentes
              </CardTitle>
              <CardDescription>
                Últimos anúncios publicados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {advertisements.map((ad) => (
                  <div key={ad.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{ad.title}</p>
                      <p className="text-sm text-gray-600">{ad.provider}</p>
                    </div>
                    <Badge variant={ad.status === 'ativo' ? 'default' : 'destructive'}>
                      {ad.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
