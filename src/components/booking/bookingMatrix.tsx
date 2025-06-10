import BookingMatrixRoom from './bookingMatrixRoom';
import BookingMatrixTimeAxis from './bookingMatrixTimeAxis';
import { BookingMatrixData } from '@/services/bookingService';

export interface IBookingMatrixProps {
  data: BookingMatrixData;
}

export default function BookingMatrix({ data }: IBookingMatrixProps) {
  return (
    <div className="flex">
      <BookingMatrixTimeAxis />
      <div className="flex w-full gap-2 overflow-scroll">
        {data.bookingMatrix.rooms.map((room) => (
          <BookingMatrixRoom key={room.id} data={room} />
        ))}
      </div>
    </div>
  );
}
