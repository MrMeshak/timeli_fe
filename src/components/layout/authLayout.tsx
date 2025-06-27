import { Link, Outlet } from '@tanstack/react-router';
import { HandMetal } from 'lucide-react';

export default function AuthLayout() {
  return (
    <div>
      <header className="absolute px-5 py-4">
        <div>
          <Link to="/">
            <HandMetal className="h-10 w-10" />
          </Link>
        </div>
      </header>
      <div className="container mx-auto px-8">
        <Outlet />
      </div>
    </div>
  );
}
