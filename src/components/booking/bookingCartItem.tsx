import { CircleX, Minus, SquareX, Trash, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BookingCartCartData } from '@/store/cartStoreHelpers';
import { formatMinsToHHMM } from '@/lib/timeUtils';
import { formatCurrency } from '@/lib/currencyUtils';

interface BookingCartItemProps {
  data: BookingCartCartData['cartArr'][number][1][number][1][number][1];
  onDelete: () => void;
}

export default function BookingCartItem({
  data,
  onDelete,
}: BookingCartItemProps) {
  return (
    <div className="border-tgreen-muted border-l-6 pl-4">
      <div className="flex justify-between">
        <div>
          <p className="text-muted-foreground">
            {formatMinsToHHMM(data.startMin)} - {formatMinsToHHMM(data.endMin)}
          </p>
        </div>
        <Button
          onClick={onDelete}
          variant="link"
          className="text-input hover:text-muted-foreground aspect-square h-5"
        >
          <SquareX className="h-3 w-3" />
          {/* <Trash className="h-3 w-3" /> */}
        </Button>
      </div>
      <div className="text-muted-foreground flex justify-end">
        <p>{formatCurrency(data.price)}</p>
      </div>
    </div>
  );
}
