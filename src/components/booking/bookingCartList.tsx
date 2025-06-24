import BookingCartItem from '@/components/booking/bookingCartItem';
import { useCartActions } from '@/store/cartStore';
import { BookingCartCartData } from '@/store/cartStoreHelpers';
import { format } from 'date-fns';

interface BookingCartListProps {
  data: BookingCartCartData['cartArr'][number];
}

export default function BookingCartList({ data }: BookingCartListProps) {
  const { removeCartItem } = useCartActions();
  return (
    <div className="p-4">
      <div className="text-muted-foreground border-border bg-muted mb-2 rounded-t-sm px-2 py-1 text-sm font-semibold">
        {format(data[0], 'PPP')}
      </div>
      {data[1].map((r) => (
        <div className="flex w-full flex-col gap-4 pb-4">
          <div className="font-semibold">
            {r[0].name} - {r[0].displayName}
          </div>
          {r[1].map((i) => (
            <BookingCartItem
              data={i[1]}
              onDelete={() => removeCartItem(data[0], r[0].id, i[1].index)}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
