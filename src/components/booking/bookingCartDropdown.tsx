import { ShoppingBasket } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenuTrigger,
  DropdownMenu,
  DropdownMenuContent,
} from '@/components/ui/dropdown-menu';

import BookingCart from './bookingCart';

export default function BookingCartDropdown() {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button className="md:w-20">
          <ShoppingBasket />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="m-2 min-w-64">
        <BookingCart />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
