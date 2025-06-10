import { useState } from 'react';
import { Route } from '@/routes/booking/$roomType.$date._layout.index';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '../ui/button';
import { Calendar } from '../ui/calendar';
import { useNavigate } from '@tanstack/react-router';
import { cn } from '@/lib/utils';

export default function BookingDatePicker() {
  const navigate = useNavigate();
  const { roomType, date } = Route.useLoaderData();

  const [calendarOpen, setCalendarOpen] = useState(false);

  return (
    <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'bg-background dark:bg-background w-55 justify-start text-left font-normal md:w-70',
            !date && 'text-muted-forground',
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, 'PPP') : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Calendar
          mode="single"
          defaultMonth={date}
          captionLayout="dropdown-buttons"
          selected={date}
          onSelect={(date) => {
            if (!date) return;
            setCalendarOpen(false);
            navigate({
              to: '/booking/$roomType/$date',
              params: { roomType, date: format(date, `yyyy-MM-dd`) },
            });
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
