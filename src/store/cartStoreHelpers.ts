import { compareAsc, format, parse } from 'date-fns';
import { RoomDetails, CartItem, CartStoreState } from './cartStore';

export type BookingCartCartSource = Pick<
  CartStoreState,
  'cartMap' | 'roomDetailsMap'
>;

export type BookingCartCartData = {
  cartArr: [Date, [RoomDetails, [number, CartItem][]][]][];
  cartCount: number;
  cartTotal: number;
};

export function toBookingCartCartData({
  cartMap,
  roomDetailsMap,
}: BookingCartCartSource): BookingCartCartData {
  const cartArr = Array.from(cartMap.entries()).map(
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
  );

  const cartTotal = cartArr.reduce(
    (z, [_, roomTupleArr]) =>
      roomTupleArr.reduce(
        (z, [_, cartItemTupleArr]) =>
          cartItemTupleArr.reduce((z, [_, cartItem]) => cartItem.price + z, 0) +
          z,
        0,
      ) + z,
    0,
  );

  const cartCount = cartArr.reduce(
    (z, [_, roomTupleArr]) =>
      roomTupleArr.reduce(
        (z, [_, cartItemTupleArr]) =>
          cartItemTupleArr.reduce((z, _) => z + 1, 0) + z,
        0,
      ) + z,
    0,
  );

  return {
    cartArr,
    cartCount,
    cartTotal,
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
