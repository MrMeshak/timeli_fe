import { Link, useNavigate } from '@tanstack/react-router';
import { LogOut, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { useMutation } from '@tanstack/react-query';
import { logout } from '@/services/authService';
import { removePermissions } from '@/store/permissionsStore';

export function UserNav() {
  const navigate = useNavigate();
  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      removePermissions();
      navigate({ to: '/' });
    },
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-transparent text-xs">
              MB
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="mx-2 mt-4">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-2">
            <p className="text-sm leading-none font-medium">Meshak Bain</p>
            <p className="text-muted-foreground text-xs leading-none">
              mr.meshakbain@gmail.com
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="hover:cursor-pointer">
          <Link to="/settings" className="flex items-center">
            <Settings />
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="hover:cursor-pointer"
          onClick={() => logoutMutation.mutate()}
        >
          <LogOut />
          logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
