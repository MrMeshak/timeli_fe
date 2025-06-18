import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';
import BookingDatePicker from './bookingDatePicker';
import BookingCartDropdown from './bookingCartDropdown';

export default function BookingHeader() {
  return (
    <>
      <div className="sticky top-14">
        <div className="relative flex justify-between pt-8 pb-16">
          <div className="flex gap-2">
            <Button variant="secondary">
              <ChevronLeft />
            </Button>
            <BookingDatePicker />
            <Button variant="secondary">
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
