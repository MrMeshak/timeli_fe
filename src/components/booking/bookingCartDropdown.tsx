import { useState } from 'react';
import { ShoppingBasket } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenuTrigger,
  DropdownMenu,
  DropdownMenuContent,
} from '@/components/ui/dropdown-menu';

import BookingCart from './bookingCart';

export default function BookingCartDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownMenu open={isOpen} modal={false} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button className="md:w-20">
          <ShoppingBasket />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        onPointerDownOutside={(e) => e.preventDefault()}
        onFocusOutside={(e) => e.preventDefault()}
        className="m-2 min-w-64"
      >
        <BookingCart />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
