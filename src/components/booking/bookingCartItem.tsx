import { Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CartData } from '@/store/cartStore';

interface BookingCartItemProps {
  data: CartData[number][1][number][1][number];
}

export default function BookingCartItem({ data }: BookingCartItemProps) {
  return (
    <div className="border-tgreen-muted border-l-6 pl-4">
      <div className="flex justify-between">
        <div>
          <p className="text-muted-foreground">16:00 - 16:30</p>
        </div>
        <Button variant="ghost" size="icon">
          <Trash className="text-muted-foreground" />
        </Button>
      </div>
      <div className="flex justify-end">
        <p>$20.00</p>
      </div>
    </div>
  );
}
