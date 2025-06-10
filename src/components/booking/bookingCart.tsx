import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import BookingCartItem from '@/components/booking/bookingCartItem';

export default function BookingCart() {
  return (
    <div>
      <div className="flex w-full flex-col gap-4 pb-4">
        <BookingCartItem />
        <BookingCartItem />
      </div>
      <Separator />
      <div>
        <div className="flex justify-between py-4">
          <p className="font-semibold">Total:</p>
          <p className="">$40.00</p>
        </div>
        <div className="flex w-full gap-2 py-2">
          <Button variant="secondary" className="flex-1">
            Clear
          </Button>
          <Button className="flex-3">Checkout</Button>
        </div>
      </div>
    </div>
  );
}
