
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, FileText, MessageSquare, Calendar, Eye, Edit } from 'lucide-react';

interface Advertisement {
  id: string;
  title: string;
  description: string;
  status: 'ativo' | 'inativo' | 'pendente';
  views: number;
  messages: number;
  createdAt: string;
}

interface Appointment {
  id: string;
  clientName: string;
  service: string;
  date: string;
  time: string;
  status: 'pendente' | 'confirmado' | 'recusado';
}

const ProviderDashboard: React.FC = () => {
  const [advertisements, setAdvertisements] = useState<Advertisement[]>([
    { id: '1', title: 'Limpeza Residencial', description: 'Serviço completo de limpeza domiciliar', status: 'ativo', views: 45, messages: 8, createdAt: '2024-01-12' },
    { id: '2', title: 'Consultoria em TI', description: 'Consultoria especializada em tecnologia', status: 'pendente', views: 12, messages: 3, createdAt: '2024-01-15' }
  ]);

  const [appointments, setAppointments] = useState<Appointment[]>([
    { id: '1', clientName: 'João Silva', service: 'Limpeza Residencial', date: '2024-01-20', time: '14:00', status: 'pendente' },
    { id: '2', clientName: 'Ana Costa', service: 'Limpeza Residencial', date: '2024-01-22', time: '09:00', status: 'confirmado' }
  ]);

  const updateAppointmentStatus = (appointmentId: string, status: 'confirmado' | 'recusado') => {
    setAppointments(appointments.map(apt => 
      apt.id === appointmentId ? { ...apt, status } : apt
    ));
  };

  const stats = [
    { title: 'Anúncios Ativos', value: advertisements.filter(ad => ad.status === 'ativo').length, icon: FileText, color: 'from-green-500 to-green-600' },
    { title: 'Visualizações', value: advertisements.reduce((sum, ad) => sum + ad.views, 0), icon: Eye, color: 'from-blue-500 to-blue-600' },
    { title: 'Mensagens', value: advertisements.reduce((sum, ad) => sum + ad.messages, 0), icon: MessageSquare, color: 'from-purple-500 to-purple-600' },
    { title: 'Agendamentos', value: appointments.filter(apt => apt.status === 'pendente').length, icon: Calendar, color: 'from-orange-500 to-orange-600' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard do Fornecedor</h1>
            <p className="text-gray-600">Gerencie seus serviços e agendamentos</p>
          </div>
          <Button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Novo Anúncio
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

        {/* My Advertisements */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="w-5 h-5 mr-2" />
              Meus Anúncios
            </CardTitle>
            <CardDescription>
              Gerencie seus serviços publicados na plataforma
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {advertisements.map((ad) => (
                <div key={ad.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-lg">{ad.title}</h3>
                        <Badge 
                          variant={ad.status === 'ativo' ? 'default' : ad.status === 'pendente' ? 'secondary' : 'destructive'}
                        >
                          {ad.status}
                        </Badge>
                      </div>
                      <p className="text-gray-600 mb-3">{ad.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>{ad.views} visualizações</span>
                        <span>{ad.messages} mensagens</span>
                        <span>Criado em {ad.createdAt}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4 mr-1" />
                        Editar
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-1" />
                        Ver
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Appointment Requests */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Solicitações de Agendamento
            </CardTitle>
            <CardDescription>
              Gerencie as solicitações dos clientes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {appointments.map((appointment) => (
                <div key={appointment.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold">{appointment.clientName}</h3>
                        <Badge 
                          variant={appointment.status === 'confirmado' ? 'default' : appointment.status === 'pendente' ? 'secondary' : 'destructive'}
                        >
                          {appointment.status}
                        </Badge>
                      </div>
                      <p className="text-gray-600 mb-2">Serviço: {appointment.service}</p>
                      <p className="text-sm text-gray-500">
                        {appointment.date} às {appointment.time}
                      </p>
                    </div>
                    {appointment.status === 'pendente' && (
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          onClick={() => updateAppointmentStatus(appointment.id, 'confirmado')}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          Confirmar
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => updateAppointmentStatus(appointment.id, 'recusado')}
                        >
                          Recusar
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProviderDashboard;
