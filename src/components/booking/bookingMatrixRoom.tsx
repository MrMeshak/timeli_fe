import { Button } from '@/components/ui/button';
import { BookingMatrixData } from '@/services/bookingService';
import { formatCurrency } from '@/lib/currencyUtils';

interface IBookingMatrixRoomProps {
  data: BookingMatrixData['bookingMatrix']['rooms'][number];
}

export default function BookingMatrixRoom({ data }: IBookingMatrixRoomProps) {
  const startHr = Number(import.meta.env.VITE_BOOKING_START_HR);
  const endHr = Number(import.meta.env.VITE_BOOKING_END_HR);

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex h-8 w-full items-center justify-center font-semibold">
        {data.displayName}
      </div>
      {data.slots.map((s) => {
        if (s.startMin < startHr * 60) return;
        if (s.startMin + data.slotSize > endHr * 60) return;
        if (s.status === 'AVAILABLE') {
          return (
            <button className="hover:bg-input/30 flex min-h-20 min-w-20 flex-1 items-end justify-end rounded-md border shadow-xs transition-all">
              <p className="text-muted-foreground/40 text-md px-1">
                {formatCurrency(s.price)}
              </p>
            </button>
          );
        }
        if (s.status === 'BOOKED') {
          return (
            <button
              disabled
              className="bg-tmaroon-muted border-tmaroon-border min-h-20 min-w-20 flex-1 rounded-md border shadow-xs"
            ></button>
          );
        }
        if (s.status === 'UNAVAILABLE') {
          return (
            <button
              className="bg-muted dark:bg-muted min-h-20 min-w-20 flex-1 rounded-md border shadow-xs"
              disabled
            ></button>
          );
        }
        if (s.status === 'PENDING') {
          return <Button className="min-h-20 min-w-20 flex-1">P</Button>;
        }
      })}
    </div>
  );
}
