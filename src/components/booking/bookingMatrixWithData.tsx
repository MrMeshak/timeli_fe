import { useQuery } from '@tanstack/react-query';
import BookingMatrix from './bookingMatrix';
import { fetchBookingMatrixData } from '@/services/bookingService';

export default function BookingMatrixWithData() {
  const bookingMatrixQuery = useQuery({
    queryKey: ['booking', 'matrix'],
    queryFn: fetchBookingMatrixData,
  });

  if (bookingMatrixQuery.isLoading) {
    return;
  }

  if (bookingMatrixQuery.isError) {
    return;
  }

  const bookingMatrixData = bookingMatrixQuery.data;
  return bookingMatrixData && <BookingMatrix data={bookingMatrixData} />;
}
