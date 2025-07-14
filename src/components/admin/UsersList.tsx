
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Users, Search, UserCheck, UserX, Eye, Mail } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'cliente' | 'fornecedor' | 'admin';
  status: 'ativo' | 'inativo';
  createdAt: string;
  lastLogin?: string;
}

const UsersList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users] = useState<User[]>([
    { 
      id: '1', 
      name: 'João Silva', 
      email: 'joao@email.com', 
      role: 'cliente', 
      status: 'ativo', 
      createdAt: '2024-01-15',
      lastLogin: '2024-01-20'
    },
    { 
      id: '2', 
      name: 'Maria Santos', 
      email: 'maria.fornecedor@email.com', 
      role: 'fornecedor', 
      status: 'ativo', 
      createdAt: '2024-01-10',
      lastLogin: '2024-01-19'
    },
    { 
      id: '3', 
      name: 'Pedro Costa', 
      email: 'pedro.fornecedor@email.com', 
      role: 'fornecedor', 
      status: 'inativo', 
      createdAt: '2024-01-05',
      lastLogin: '2024-01-15'
    },
    { 
      id: '4', 
      name: 'Ana Oliveira', 
      email: 'ana@email.com', 
      role: 'cliente', 
      status: 'ativo', 
      createdAt: '2024-01-12',
      lastLogin: '2024-01-21'
    },
    { 
      id: '5', 
      name: 'Admin User', 
      email: 'admin@servicehub.com', 
      role: 'admin', 
      status: 'ativo', 
      createdAt: '2024-01-01',
      lastLogin: '2024-01-21'
    }
  ]);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'admin': return 'destructive';
      case 'fornecedor': return 'default';
      case 'cliente': return 'secondary';
      default: return 'secondary';
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    return status === 'ativo' ? 'default' : 'destructive';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <Users className="w-8 h-8 mr-3" />
              Gerenciar Usuários
            </h1>
            <p className="text-gray-600">Visualize e gerencie todos os usuários da plataforma</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total de Usuários</p>
                  <p className="text-3xl font-bold text-gray-900">{users.length}</p>
                </div>
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Clientes</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {users.filter(u => u.role === 'cliente').length}
                  </p>
                </div>
                <UserCheck className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Fornecedores</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {users.filter(u => u.role === 'fornecedor').length}
                  </p>
                </div>
                <UserCheck className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Usuários Ativos</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {users.filter(u => u.status === 'ativo').length}
                  </p>
                </div>
                <UserCheck className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Lista de Usuários</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Buscar por nome, email ou tipo..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Users Table */}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Data de Cadastro</TableHead>
                  <TableHead>Último Login</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge variant={getRoleBadgeVariant(user.role)}>
                        {user.role === 'cliente' ? 'Cliente' : 
                         user.role === 'fornecedor' ? 'Fornecedor' : 'Admin'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(user.status)}>
                        {user.status === 'ativo' ? 'Ativo' : 'Inativo'}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatDate(user.createdAt)}</TableCell>
                    <TableCell>
                      {user.lastLogin ? formatDate(user.lastLogin) : 'Nunca'}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Mail className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className={user.status === 'ativo' ? 'text-red-600' : 'text-green-600'}
                        >
                          {user.status === 'ativo' ? 
                            <UserX className="w-4 h-4" /> : 
                            <UserCheck className="w-4 h-4" />
                          }
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {filteredUsers.length === 0 && (
              <div className="text-center py-8">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Nenhum usuário encontrado</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UsersList;
