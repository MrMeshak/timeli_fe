import { createFileRoute, notFound } from '@tanstack/react-router';
import { isValid, parse } from 'date-fns';
import BookingHeader from '@/components/booking/bookingHeader';

export const Route = createFileRoute('/(booking)/booking/$roomType/$date')({
  component: BookingPage,
  loader: ({ params }) => {
    const { roomType, date: dateStr } = params;
    const date = parse(dateStr, 'yyyy-MM-dd', new Date());

    if (!isValid(date) || !/^[a-z0-9-]+$/.test(roomType)) {
      throw notFound();
    }
    return { date, roomType };
  },
});

function BookingPage() {
  return (
    <div>
      <BookingHeader />
    </div>
  );
}
