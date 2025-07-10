
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Calendar, MessageSquare, Star, MapPin, Clock } from 'lucide-react';

interface Service {
  id: string;
  title: string;
  description: string;
  provider: string;
  rating: number;
  price: string;
  location: string;
  image?: string;
}

interface Booking {
  id: string;
  service: string;
  provider: string;
  date: string;
  time: string;
  status: 'pendente' | 'confirmado' | 'concluido' | 'cancelado';
}

const ClientDashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [services, setServices] = useState<Service[]>([
    { id: '1', title: 'Limpeza Residencial', description: 'Serviço completo de limpeza para sua casa', provider: 'Maria Santos', rating: 4.8, price: 'R$ 80/h', location: 'São Paulo, SP' },
    { id: '2', title: 'Consultoria em TI', description: 'Consultoria especializada em tecnologia', provider: 'Pedro Costa', rating: 4.9, price: 'R$ 150/h', location: 'São Paulo, SP' },
    { id: '3', title: 'Aulas de Inglês', description: 'Aulas particulares de inglês online', provider: 'Ana Silva', rating: 4.7, price: 'R$ 60/h', location: 'Online' },
  ]);

  const [bookings, setBookings] = useState<Booking[]>([
    { id: '1', service: 'Limpeza Residencial', provider: 'Maria Santos', date: '2024-01-20', time: '14:00', status: 'confirmado' },
    { id: '2', service: 'Consultoria em TI', provider: 'Pedro Costa', date: '2024-01-22', time: '09:00', status: 'pendente' }
  ]);

  const filteredServices = services.filter(service =>
    service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = [
    { title: 'Serviços Encontrados', value: filteredServices.length, icon: Search, color: 'from-blue-500 to-blue-600' },
    { title: 'Agendamentos', value: bookings.length, icon: Calendar, color: 'from-green-500 to-green-600' },
    { title: 'Mensagens', value: 5, icon: MessageSquare, color: 'from-purple-500 to-purple-600' },
    { title: 'Avaliações', value: 3, icon: Star, color: 'from-orange-500 to-orange-600' }
  ];

  const handleBookService = (serviceId: string) => {
    console.log('Agendar serviço:', serviceId);
    // Implementar lógica de agendamento
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Encontrar Serviços</h1>
            <p className="text-gray-600">Descubra os melhores fornecedores para suas necessidades</p>
          </div>
        </div>

        {/* Search Bar */}
        <Card className="shadow-lg border-0">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Buscar serviços..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 text-lg border-gray-200 focus:border-blue-400 focus:ring-blue-400"
              />
            </div>
          </CardContent>
        </Card>

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

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <Card key={service.id} className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center">
                <div className="text-6xl opacity-20">🏠</div>
              </div>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-xl mb-2">{service.title}</h3>
                    <p className="text-gray-600 text-sm">{service.description}</p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{service.rating}</span>
                    </div>
                    <Badge variant="secondary">{service.price}</Badge>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      {service.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="font-medium">Fornecedor:</span>
                      <span className="ml-1">{service.provider}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button 
                      className="flex-1 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                      onClick={() => handleBookService(service.id)}
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      Agendar
                    </Button>
                    <Button variant="outline" size="default">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Mensagem
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* My Bookings */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Meus Agendamentos
            </CardTitle>
            <CardDescription>
              Acompanhe seus serviços agendados
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {bookings.map((booking) => (
                <div key={booking.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold">{booking.service}</h3>
                        <Badge 
                          variant={booking.status === 'confirmado' ? 'default' : 
                                  booking.status === 'pendente' ? 'secondary' : 
                                  booking.status === 'concluido' ? 'default' : 'destructive'}
                        >
                          {booking.status}
                        </Badge>
                      </div>
                      <p className="text-gray-600 mb-2">Fornecedor: {booking.provider}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {booking.date}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {booking.time}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <MessageSquare className="w-4 h-4 mr-1" />
                        Mensagem
                      </Button>
                      {booking.status === 'concluido' && (
                        <Button variant="outline" size="sm">
                          <Star className="w-4 h-4 mr-1" />
                          Avaliar
                        </Button>
                      )}
                    </div>
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

export default ClientDashboard;
