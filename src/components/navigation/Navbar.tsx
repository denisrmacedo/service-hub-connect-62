
import React from 'react';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator 
} from '@/components/ui/dropdown-menu';
import { LogOut, Settings, User, MessageSquare, Bell } from 'lucide-react';

interface NavbarProps {
  userRole: 'admin' | 'cliente' | 'fornecedor';
  userName: string;
  onLogout: () => void;
  unreadMessages?: number;
}

const Navbar: React.FC<NavbarProps> = ({ userRole, userName, onLogout, unreadMessages = 0 }) => {
  const getRoleColor = () => {
    switch (userRole) {
      case 'admin': return 'from-red-500 to-pink-500';
      case 'fornecedor': return 'from-green-500 to-blue-500';
      case 'cliente': return 'from-blue-500 to-purple-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getRoleLabel = () => {
    switch (userRole) {
      case 'admin': return 'Administrador';
      case 'fornecedor': return 'Fornecedor';
      case 'cliente': return 'Cliente';
      default: return 'Usuário';
    }
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-3">
            <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${getRoleColor()} flex items-center justify-center`}>
              <span className="text-white font-bold text-sm">SH</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">ServiceHub</h1>
              <p className="text-xs text-gray-500">{getRoleLabel()}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Messages */}
          <Button variant="ghost" size="sm" className="relative">
            <MessageSquare className="h-5 w-5" />
            {unreadMessages > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {unreadMessages > 9 ? '9+' : unreadMessages}
              </span>
            )}
          </Button>

          {/* Notifications */}
          <Button variant="ghost" size="sm">
            <Bell className="h-5 w-5" />
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className={`h-10 w-10 bg-gradient-to-r ${getRoleColor()}`}>
                  <User className="h-6 w-6 text-white" />
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <div className="flex flex-col space-y-1 p-2">
                <p className="text-sm font-medium leading-none">{userName}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {getRoleLabel()}
                </p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Perfil</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Configurações</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sair</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
