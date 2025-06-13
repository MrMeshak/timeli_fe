import { Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function BookingCartItem() {
  return (
    <div className="border-tgreen-muted border-l-6 pl-4">
      <div className="flex justify-between">
        <div>
          {/* <h4 className="font-semibold">Court 1</h4> */}
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
