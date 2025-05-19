import BookingMatrixRoom from './bookingMatrixRoom';
import BookingMatrixTimeAxis from './bookingMatrixTimeAxis';
import { IBookingMatrixData } from '@/services/bookingService';

export interface IBookingMatrixProps {
  data: IBookingMatrixData;
}

export default function BookingMatrix({ data }: IBookingMatrixProps) {
  return (
    <div className="flex">
      <BookingMatrixTimeAxis data={data.bookingMatrix.timeInterval} />
      <div className="flex w-full gap-2 overflow-scroll">
        {data.bookingMatrix.rooms.map((room) => (
          <BookingMatrixRoom key={room.id} data={room} />
        ))}
      </div>
    </div>
  );
}
