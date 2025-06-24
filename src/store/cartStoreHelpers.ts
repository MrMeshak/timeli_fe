import { compareAsc, format, parse } from 'date-fns';
import { RoomDetails, CartItem, CartStoreState } from './cartStore';

export type BookingCartCartSource = Pick<
  CartStoreState,
  'cartMap' | 'roomDetailsMap'
>;
export type BookingCartCartData = {
  cartArr: [Date, [RoomDetails, [number, CartItem][]][]][];
};

export function toBookingCartCartData({
  cartMap,
  roomDetailsMap,
}: BookingCartCartSource): BookingCartCartData {
  return {
    cartArr: Array.from(cartMap.entries()).map(
      ([dateStr, roomMap]): BookingCartCartData['cartArr'][number] => [
        parse(dateStr, 'yyyy-MM-dd', new Date()),
        Array.from(roomMap.entries())
          .sort(([a], [b]) => compareAsc(a, b))
          .map(
            ([
              roomId,
              cartItemMap,
            ]): BookingCartCartData['cartArr'][number][1][number] => [
              roomDetailsMap.get(roomId) || {
                id: '',
                name: '',
                displayName: '',
                slotSize: 30,
              },
              Array.from(cartItemMap.entries()).sort(([a], [b]) => a - b),
            ],
          ),
      ],
    ),
  };
}

export type BookingMatrixRoomCartSource = Pick<CartStoreState, 'cartMap'>;
export type BookingMatrixRoomCartData = {
  cartItemMap?: Map<number, CartItem>;
};

export function toBookingMatrixRoomCartData(
  { cartMap }: BookingMatrixRoomCartSource,
  date: Date,
  roomId: string,
): BookingMatrixRoomCartData {
  return {
    cartItemMap: cartMap.get(format(date, 'yyyy-MM-dd'))?.get(roomId),
  };
}
