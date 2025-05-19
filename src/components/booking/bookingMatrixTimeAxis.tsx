import { IBookingMatrixData } from '@/services/bookingService';

interface IBookingMatrixTimeAxisProps {
  data: IBookingMatrixData['bookingMatrix']['timeInterval'];
}

export default function BookingMatrixTimeAxis({
  data,
}: IBookingMatrixTimeAxisProps) {
  const times = Array.from(
    { length: data.endHr - data.startHr },
    (_, i) => data.startHr + i,
  );

  return (
    <div className="flex flex-col items-stretch">
      <div className="h-8"></div>
      {times.map((hr) => (
        <div className="mx-2 w-12 flex-1 border-t-2 md:w-15">
          <p className="bg-background text-muted-foreground rounded-md">
            {hr}:00
          </p>
        </div>
      ))}
    </div>
  );
}
