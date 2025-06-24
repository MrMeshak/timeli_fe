import { useMemo } from 'react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import BookingCartList from '@/components/booking/bookingCartList';
import { useBookingCartCartSource } from '@/store/cartStore';
import { toBookingCartCartData } from '@/store/cartStoreHelpers';

export default function BookingCart() {
  const CartSource = useBookingCartCartSource();
  const CartData = useMemo(
    () => toBookingCartCartData(CartSource),
    [CartSource],
  );

  return (
    <div>
      <div>
        {CartData.cartArr.map((x) => (
          <BookingCartList data={x} />
        ))}
      </div>
      <div className="bg-popover sticky bottom-0 w-full px-4 py-2">
        <Separator />
        <div className="flex justify-between py-4">
          <p className="font-semibold">Total:</p>
          <p className="">$40.00</p>
        </div>
        <div className="bg-popover flex w-full gap-2 py-2">
          <Button variant="secondary" className="flex-1">
            Clear
          </Button>
          <Button className="flex-3">Checkout</Button>
        </div>
      </div>
    </div>
  );
}
