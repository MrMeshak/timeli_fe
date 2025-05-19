import { Button } from '@/components/ui/button';
import { IBookingMatrixData } from '@/services/bookingService';
import { formatCurrency } from '@/lib/currencyUtils';

interface IBookingMatrixRoomProps {
  data: IBookingMatrixData['bookingMatrix']['rooms'][number];
}

export default function BookingMatrixRoom({ data }: IBookingMatrixRoomProps) {
  return (
    <div className="flex w-full flex-col">
      <div className="flex h-8 w-full items-center justify-center font-semibold">
        {data.displayName}
      </div>
      {data.slots.map((s) => {
        if (s.status === 'available') {
          return (
            <button className="hover:bg-input/30 my-1 flex min-h-20 min-w-20 flex-1 items-end justify-end rounded-md border px-2 py-1 shadow-xs transition-all">
              <p className="text-muted-foreground/40 text-sm">
                {formatCurrency(s.price)}
              </p>
            </button>
          );
        }
        if (s.status === 'booked') {
          return (
            <button
              disabled
              className="bg-tgold-muted border-tgold-border my-1 min-h-20 flex-1 rounded-md border shadow-xs"
            ></button>
          );
        }
        if (s.status === 'unavailable') {
          return (
            <button
              className="bg-muted dark:bg-muted my-1 min-h-20 flex-1 rounded-md border shadow-xs"
              disabled
            ></button>
          );
        }
        if (s.status === 'pending') {
          return <Button className="my-1 min-h-20 flex-1">P</Button>;
        }
      })}
    </div>
  );
}
