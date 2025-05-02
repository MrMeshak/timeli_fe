import { Link } from '@tanstack/react-router';
import { HandMetal } from 'lucide-react';
import ThemeToggle from './themeToggle';
import { useAuthContext } from '../hooks/useAuthContext';
import { Button } from '../ui/button';
import { UserNavWithData } from './userNavWithData';

export function Navbar() {
  const { isAuthenticated } = useAuthContext();

  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary sticky top-0 z-10 w-full shadow backdrop-blur">
      <div className="mx-4 flex h-14 items-center justify-between sm:mx-8">
        <div className="flex items-center space-x-4 lg:space-x-0">
          <Link to="/">
            <HandMetal />
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <ThemeToggle />
          {isAuthenticated ? (
            <UserNavWithData />
          ) : (
            <Button asChild>
              <Link to="/auth/login">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
