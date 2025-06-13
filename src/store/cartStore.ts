import { create } from 'zustand';
import {
  persist,
  PersistStorage,
  StateStorage,
  StorageValue,
} from 'zustand/middleware';
import { BookingMatrixData } from '@/services/bookingService';
import superjson from 'superjson';

type CartItem =
  BookingMatrixData['bookingMatrix']['rooms'][number]['slots'][number];
import { format } from 'date-fns';

type RoomDetails = Pick<
  BookingMatrixData['bookingMatrix']['rooms'][number],
  'id' | 'displayName' | 'name'
>;

interface CartStoreState {
  cartMap: Map<
    string, //date string
    Map<
      string, //roomId
      Map<
        number, //index
        CartItem
      >
    >
  >;

  roomDetailsMap: Map<string, RoomDetails>;

  actions: {
    addCartItem: (
      date: Date,
      roomDetails: RoomDetails,
      cartItem: CartItem,
    ) => void;
    removeCartItem: (
      date: Date,
      roomDetails: RoomDetails,
      cartItem: CartItem,
    ) => void;
  };
}

type CartStorage = Pick<CartStoreState, 'cartMap' | 'roomDetailsMap'>;

const storage: PersistStorage<CartStorage> = {
  getItem: (name) => {
    const str = localStorage.getItem(name);
    return str ? superjson.parse(str) : null;
  },
  setItem: (name, newValue: StorageValue<CartStorage>) => {
    localStorage.setItem(name, superjson.stringify(newValue));
  },
  removeItem: (name) => localStorage.removeItem(name),
};

const useCartStore = create<CartStoreState>()(
  persist(
    (set, get) => ({
      cartMap: new Map<string, Map<string, Map<number, CartItem>>>(),
      roomDetailsMap: new Map<string, RoomDetails>(),
      actions: {
        addCartItem: (
          date: Date,
          roomDetails: RoomDetails,
          cartItem: CartItem,
        ) => {
          const updatedCartMap = structuredClone(get().cartMap);
          const updatedRoomDetailsMap = structuredClone(get().roomDetailsMap);

          const dateStr = format(date, 'yyyy-MM-dd');

          const roomMap =
            updatedCartMap.get(dateStr) ||
            updatedCartMap.set(dateStr, new Map()).get(dateStr)!;
          const cartItemMap =
            roomMap.get(roomDetails.id) ||
            roomMap.set(roomDetails.id, new Map()).get(roomDetails.id)!;
          cartItemMap.set(cartItem.index, cartItem);

          updatedRoomDetailsMap.set(roomDetails.id, roomDetails);

          set(() => ({
            cartMap: updatedCartMap,
            roomDetailsMap: updatedRoomDetailsMap,
          }));
        },
        removeCartItem: (
          _date: Date,
          _roomDetails: RoomDetails,
          _cartItem: CartItem,
        ) => {},
      },
    }),
    {
      name: 'cartStore',
      storage: storage,
      partialize: (state) => ({
        cartMap: state.cartMap,
        roomDetailsMap: state.roomDetailsMap,
      }),
    },
  ),
);

export const useCartData = () =>
  useCartStore((state) => {
    return Array.from(state.cartMap.entries())
      .sort(([a], [b]) => new Date(b).getTime() - new Date(a).getTime())
      .map(([dateStr, roomMap]) => [
        dateStr,
        Array.from(roomMap.entries()).map(([roomId, cartItemMap]) => [
          roomId,
          Array.from(cartItemMap.entries()).sort(([a], [b]) => a - b),
        ]),
      ]);
  });
