import BookingCartItem from '@/components/booking/bookingCartItem';

export default function BookingCartList() {
  return (
    <div className="p-4">
      <div className="text-muted-foreground border-border bg-muted mb-2 rounded-t-sm px-2 py-1 text-sm font-semibold">
        June 1st, 2025
      </div>
      <div className="flex w-full flex-col gap-4 pb-4">
        <div className="font-semibold">Court 1 - C1</div>
        <BookingCartItem />
        <BookingCartItem />
        <div className="font-semibold">Court 3 - C3</div>
        <BookingCartItem />
        <BookingCartItem />
      </div>
    </div>
  );
}
