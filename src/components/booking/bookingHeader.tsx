import { useNavigate } from '@tanstack/react-router';
import { format, addDays, subDays } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';
import BookingDatePicker from './bookingDatePicker';
import BookingCartDropdown from './bookingCartDropdown';
import { bookingMatrixRoute } from '@/routes/bookingRoutes';

export default function BookingHeader() {
  const navigate = useNavigate();
  const {
    params: { roomTypeId, date },
  } = bookingMatrixRoute.useLoaderData();

  return (
    <>
      <div className="sticky top-14">
        <div className="relative flex justify-between pt-8 pb-16">
          <div className="flex gap-2">
            <Button
              onClick={() =>
                navigate({
                  to: '/booking/$roomTypeId/$date',
                  params: {
                    roomTypeId,
                    date: format(subDays(date, 1), 'yyyy-MM-dd'),
                  },
                })
              }
              variant="secondary"
            >
              <ChevronLeft />
            </Button>
            <BookingDatePicker />
            <Button
              onClick={() =>
                navigate({
                  to: '/booking/$roomTypeId/$date',
                  params: {
                    roomTypeId,
                    date: format(addDays(date, 1), 'yyyy-MM-dd'),
                  },
                })
              }
              variant="secondary"
            >
              <ChevronRight />
            </Button>
          </div>
          <div>
            <BookingCartDropdown />
          </div>
          <div className="bg-background absolute top-0 -z-10 h-22 w-full"></div>
          <div className="from-background pointer-events-none absolute top-22 -z-10 h-25 w-full bg-gradient-to-b to-transparent"></div>
        </div>
      </div>
    </>
  );
}
