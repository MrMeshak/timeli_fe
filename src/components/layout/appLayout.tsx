import { Outlet } from '@tanstack/react-router';
import { Navbar } from '../nav/navbar';

export default function AppLayout() {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-8">
        <Outlet />
      </div>
    </div>
  );
}
