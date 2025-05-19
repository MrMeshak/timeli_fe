import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';
import BookingDatePicker from './bookingDatePicker';

export default function BookingHeader() {
  return (
    <>
      <div className="sticky top-14">
        <div className="relative">
          <div className="mb-10 flex gap-2 px-16 pt-8 pb-2 md:px-19">
            <Button variant="secondary">
              <ChevronLeft />
            </Button>
            <BookingDatePicker />
            <Button variant="secondary">
              <ChevronRight />
            </Button>
          </div>
          {/* <div className="bg-background absolute top-0 -z-10 h-8 w-full"></div> */}
          <div className="from-background pointer-events-none absolute top-0 -z-10 h-45 w-full bg-gradient-to-b to-transparent"></div>
        </div>
      </div>
    </>
  );
}
