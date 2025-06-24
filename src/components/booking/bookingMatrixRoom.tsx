import { useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { BookingMatrixData } from '@/services/bookingService';
import { formatCurrency } from '@/lib/currencyUtils';
import {
  useBookingMatrixRoomCartSource,
  useCartActions,
} from '@/store/cartStore';
import { bookingMatrixRoute } from '@/routes/bookingRoutes';
import { cn } from '@/lib/utils';
import { toBookingMatrixRoomCartData } from '@/store/cartStoreHelpers';

interface IBookingMatrixRoomProps {
  data: BookingMatrixData['bookingMatrix']['rooms'][number];
}

export default function BookingMatrixRoom({ data }: IBookingMatrixRoomProps) {
  const {
    params: { date },
  } = bookingMatrixRoute.useLoaderData();
  const cartSource = useBookingMatrixRoomCartSource();
  const cartData = useMemo(
    () => toBookingMatrixRoomCartData(cartSource, date, data.id),
    [cartSource, date, data.id],
  );
  const { toggleCartItem } = useCartActions();

  const startHr = Number(import.meta.env.VITE_BOOKING_START_HR);
  const endHr = Number(import.meta.env.VITE_BOOKING_END_HR);

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex h-8 w-full items-center justify-center font-semibold">
        {data.displayName}
      </div>
      {data.slots.map((s) => {
        const isCartItem = cartData.cartItemMap?.get(s.index);
        if (s.startMin < startHr * 60) return;
        if (s.startMin + data.slotSize > endHr * 60) return;
        if (s.status === 'AVAILABLE') {
          return (
            <button
              key={`${data.id}-${s.index}`}
              onClick={() => toggleCartItem(date, data, s)}
              className={cn(
                'hover:bg-input/20 text-muted-foreground flex min-h-20 min-w-20 flex-1 items-end justify-end rounded-md border shadow-xs',
                isCartItem &&
                  'bg-tgreen-muted border-tgreen-border hover:bg-tgreen-muted/80',
              )}
            >
              <p
                className={cn(
                  'text-muted-foreground/40 text-md px-2 py-1',
                  isCartItem && 'text-tgreen-500',
                )}
              >
                {formatCurrency(s.price)}
              </p>
            </button>
          );
        }
        if (s.status === 'BOOKED') {
          return (
            <button
              key={`${data.id}-${s.index}`}
              disabled
              className="bg-tgold-muted border-tgold-border flex min-h-20 min-w-20 flex-1 items-end justify-end rounded-md border shadow-xs"
            ></button>
          );
        }
        if (s.status === 'UNAVAILABLE') {
          return (
            <button
              key={`${data.id}-${s.index}`}
              className="bg-muted dark:bg-muted min-h-20 min-w-20 flex-1 rounded-md border shadow-xs"
              disabled
            ></button>
          );
        }
        if (s.status === 'PENDING') {
          return (
            <Button
              key={`${data.id}-${s.index}`}
              className="min-h-20 min-w-20 flex-1"
            >
              P
            </Button>
          );
        }
      })}
    </div>
  );
}
