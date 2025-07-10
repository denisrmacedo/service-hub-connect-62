
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar } from '@/components/ui/avatar';
import { Send, User } from 'lucide-react';

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  isMe: boolean;
}

interface Conversation {
  id: string;
  participant: string;
  lastMessage: string;
  unread: number;
  timestamp: string;
}

const MessagingSystem: React.FC = () => {
  const [selectedConversation, setSelectedConversation] = useState<string | null>('1');
  const [newMessage, setNewMessage] = useState('');

  const [conversations, setConversations] = useState<Conversation[]>([
    { id: '1', participant: 'Maria Santos', lastMessage: 'Obrigada pelo interesse! Quando gostaria de agendar?', unread: 2, timestamp: '10:30' },
    { id: '2', participant: 'Pedro Costa', lastMessage: 'Posso atender na próxima semana', unread: 0, timestamp: '09:15' },
    { id: '3', participant: 'Ana Silva', lastMessage: 'Vamos começar as aulas na segunda-feira', unread: 1, timestamp: 'Ontem' }
  ]);

  const [messages, setMessages] = useState<Message[]>([
    { id: '1', sender: 'Maria Santos', content: 'Olá! Vi que tem interesse no meu serviço de limpeza.', timestamp: '10:25', isMe: false },
    { id: '2', sender: 'Você', content: 'Sim! Gostaria de saber mais sobre os preços e disponibilidade.', timestamp: '10:26', isMe: true },
    { id: '3', sender: 'Maria Santos', content: 'Cobro R$ 80 por hora e tenho disponibilidade nas tardes de segunda a sexta.', timestamp: '10:28', isMe: false },
    { id: '4', sender: 'Maria Santos', content: 'Obrigada pelo interesse! Quando gostaria de agendar?', timestamp: '10:30', isMe: false }
  ]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      sender: 'Você',
      content: newMessage,
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      isMe: true
    };

    setMessages([...messages, message]);
    setNewMessage('');

    // Update conversation preview
    setConversations(conversations.map(conv => 
      conv.id === selectedConversation 
        ? { ...conv, lastMessage: newMessage, timestamp: message.timestamp }
        : conv
    ));
  };

  const selectedConversationData = conversations.find(c => c.id === selectedConversation);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Mensagens</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
          {/* Conversations List */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle>Conversas</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-0">
                {conversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    onClick={() => setSelectedConversation(conversation.id)}
                    className={`p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors ${
                      selectedConversation === conversation.id ? 'bg-blue-50 border-r-4 border-r-blue-500' : ''
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10 bg-gradient-to-br from-blue-400 to-green-400">
                        <User className="h-6 w-6 text-white" />
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {conversation.participant}
                          </p>
                          <div className="flex items-center space-x-2">
                            <p className="text-xs text-gray-500">{conversation.timestamp}</p>
                            {conversation.unread > 0 && (
                              <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-500 rounded-full">
                                {conversation.unread}
                              </span>
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-gray-500 truncate">{conversation.lastMessage}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Chat Area */}
          <Card className="lg:col-span-2 shadow-lg border-0 flex flex-col">
            {selectedConversationData ? (
              <>
                <CardHeader className="border-b">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10 bg-gradient-to-br from-blue-400 to-green-400">
                      <User className="h-6 w-6 text-white" />
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{selectedConversationData.participant}</CardTitle>
                      <p className="text-sm text-gray-500">Online</p>
                    </div>
                  </div>
                </CardHeader>

                {/* Messages */}
                <CardContent className="flex-1 p-4 overflow-y-auto">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.isMe ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                            message.isMe
                              ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white'
                              : 'bg-gray-100 text-gray-900'
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p className={`text-xs mt-1 ${message.isMe ? 'text-blue-100' : 'text-gray-500'}`}>
                            {message.timestamp}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>

                {/* Message Input */}
                <div className="border-t p-4">
                  <div className="flex space-x-2">
                    <Input
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Digite sua mensagem..."
                      className="flex-1"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                    />
                    <Button 
                      onClick={handleSendMessage}
                      className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <CardContent className="flex-1 flex items-center justify-center">
                <p className="text-gray-500">Selecione uma conversa para começar</p>
              </CardContent>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MessagingSystem;
