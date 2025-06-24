import { create } from 'zustand';
import { useShallow } from 'zustand/shallow';
import { persist, PersistStorage, StorageValue } from 'zustand/middleware';
import { BookingMatrixData } from '@/services/bookingService';
import superjson from 'superjson';
import { format } from 'date-fns';
import {
  BookingCartCartSource,
  BookingMatrixRoomCartSource,
} from './cartStoreHelpers';

export type CartItem =
  BookingMatrixData['bookingMatrix']['rooms'][number]['slots'][number];

export type RoomDetails = Pick<
  BookingMatrixData['bookingMatrix']['rooms'][number],
  'id' | 'displayName' | 'name' | 'slotSize'
>;

export interface CartStoreState {
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
    removeCartItem: (date: Date, roomId: string, cartIndex: number) => void;
    toggleCartItem: (
      date: Date,
      roomDetails: RoomDetails,
      CartItem: CartItem,
    ) => void;
    clearCart: () => void;
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
          const cartMap = structuredClone(get().cartMap);
          const roomDetailsMap = structuredClone(get().roomDetailsMap);

          const dateStr = format(date, 'yyyy-MM-dd');

          const roomMap =
            cartMap.get(dateStr) ||
            cartMap.set(dateStr, new Map()).get(dateStr)!;
          const cartItemMap =
            roomMap.get(roomDetails.id) ||
            roomMap.set(roomDetails.id, new Map()).get(roomDetails.id)!;

          cartItemMap.set(cartItem.index, cartItem);

          roomDetailsMap.set(roomDetails.id, roomDetails);

          set(() => ({
            cartMap: cartMap,
            roomDetailsMap: roomDetailsMap,
          }));
        },
        removeCartItem: (date: Date, roomId: string, cartIndex: number) => {
          const cartMap = structuredClone(get().cartMap);
          const roomDetailsMap = structuredClone(get().roomDetailsMap);

          const dateStr = format(date, 'yyyy-MM-dd');

          const roomMap = cartMap.get(dateStr);
          if (!roomMap) return;

          const cartItemMap = roomMap.get(roomId);
          if (!cartItemMap) return;

          cartItemMap.delete(cartIndex);

          if (cartItemMap.size === 0) {
            roomMap.delete(roomId);
            roomDetailsMap.delete(roomId);
          }
          if (roomMap.size === 0) cartMap.delete(dateStr);

          set(() => ({
            cartMap,
            roomDetailsMap,
          }));
        },
        toggleCartItem: (
          date: Date,
          roomDetails: RoomDetails,
          cartItem: CartItem,
        ) => {
          const { cartMap, actions } = get();
          const dateStr = format(date, 'yyyy-MM-dd');
          if (cartMap.get(dateStr)?.get(roomDetails.id)?.get(cartItem.index)) {
            actions.removeCartItem(date, roomDetails.id, cartItem.index);
          } else {
            actions.addCartItem(date, roomDetails, cartItem);
          }
        },
        clearCart: () => {
          set(() => ({
            cartMap: new Map(),
            roomDetailsMap: new Map(),
          }));
        },
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

export const useCartActions = () =>
  useCartStore((state) => {
    return state.actions;
  });

export const useBookingCartCartSource = (): BookingCartCartSource =>
  useCartStore(
    useShallow((state) => ({
      cartMap: state.cartMap,
      roomDetailsMap: state.roomDetailsMap,
    })),
  );

export const useBookingMatrixRoomCartSource = (): BookingMatrixRoomCartSource =>
  useCartStore(
    useShallow((state) => ({
      cartMap: state.cartMap,
    })),
  );
