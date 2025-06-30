import { useMemo, useState } from 'react';
import { ShoppingBasket } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenuTrigger,
  DropdownMenu,
  DropdownMenuContent,
} from '@/components/ui/dropdown-menu';

import BookingCart from './bookingCart';
import { useBookingCartCartSource } from '@/store/cartStore';
import { toBookingCartCartData } from '@/store/cartStoreHelpers';

export default function BookingCartDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const cartSource = useBookingCartCartSource();
  const { cartCount } = useMemo(
    () => toBookingCartCartData(cartSource),
    [cartSource],
  );

  return (
    <DropdownMenu open={isOpen} modal={false} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button className="relative md:w-20">
          <ShoppingBasket />
          {!!cartCount && <span className="text-xs">{cartCount}</span>}
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
