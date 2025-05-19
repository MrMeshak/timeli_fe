import { createFileRoute, notFound, redirect } from '@tanstack/react-router';
import { isValid, parse, format } from 'date-fns';
import BookingHeader from '@/components/booking/bookingHeader';
import BookingMatrixWithData from '@/components/booking/bookingMatrixWithData';

export const Route = createFileRoute('/booking/$roomType/$date/_layout/')({
  component: BookingPage,
  loader: ({ params }) => {
    const { roomType, date: dateStr } = params;

    const date = parse(dateStr, 'yyyy-MM-dd', new Date());

    if (!/^[a-z0-9-]+$/.test(roomType)) {
      throw notFound();
    }

    if (!isValid(date)) {
      throw redirect({
        to: '/booking/$roomType/$date',
        params: { roomType, date: format(Date.now(), 'yyyy-MM-dd') },
      });
    }

    return { date, roomType };
  },
});

function BookingPage() {
  return (
    <div>
      <BookingHeader />
      <BookingMatrixWithData />
    </div>
  );
}
