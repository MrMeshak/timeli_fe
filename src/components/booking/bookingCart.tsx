import { useMemo } from 'react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import BookingCartList from '@/components/booking/bookingCartList';
import { useBookingCartCartSource, useCartActions } from '@/store/cartStore';
import { toBookingCartCartData } from '@/store/cartStoreHelpers';
import { formatCurrency } from '@/lib/currencyUtils';

export default function BookingCart() {
  const cartSource = useBookingCartCartSource();
  const cartData = useMemo(
    () => toBookingCartCartData(cartSource),
    [cartSource],
  );
  const { clearCart } = useCartActions();

  return (
    <div>
      <div>
        {cartData.cartArr.map((x) => (
          <BookingCartList data={x} />
        ))}
      </div>
      <div className="bg-popover sticky bottom-0 w-full px-4 py-2">
        {cartData.cartArr.length !== 0 && <Separator />}
        <div className="flex justify-between py-4">
          <p className="font-semibold">Total:</p>
          <p className="">{formatCurrency(cartData.cartTotal)}</p>
        </div>
        <div className="bg-popover flex w-full gap-2 py-2">
          <Button onClick={clearCart} variant="secondary" className="flex-1">
            Clear
          </Button>
          <Button className="flex-3">Checkout</Button>
        </div>
      </div>
    </div>
  );
}
