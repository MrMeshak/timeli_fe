import { createRoute, notFound, redirect } from '@tanstack/react-router';
import { rootRoute } from '@/routes/routes';
import { parse } from 'date-fns/parse';
import { format, isValid } from 'date-fns';
import {
  BookingContextData,
  fetchBookingContextData,
} from '@/services/bookingService';

import BookingMatrixPage from '@/app/booking/bookingMatrixPage';
import AppLayout from '@/components/layout/appLayout';

const bookingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'booking/$roomTypeId/$date',
  component: AppLayout,
});

export const bookingMatrixRoute = createRoute({
  getParentRoute: () => bookingRoute,
  path: '/',
  beforeLoad: async ({ context }) => {
    const { queryClient } = context;
    await queryClient.ensureQueryData({
      queryKey: ['booking', 'context'],
      queryFn: fetchBookingContextData,
      staleTime: Infinity,
    });
    return {};
  },
  loader: ({ context, params }) => {
    const { queryClient } = context;
    const { roomTypeId, date: dateStr } = params;

    const bookingContextData = queryClient.getQueryData<BookingContextData>([
      'booking',
      'context',
    ]);

    if (
      !bookingContextData ||
      !bookingContextData.roomTypes.some((rt) => rt.id === params.roomTypeId)
    ) {
      throw notFound();
    }

    const date = parse(dateStr, 'yyyy-MM-dd', new Date());
    if (!isValid(date)) {
      throw redirect({
        to: '/booking/$roomTypeId/$date/matrix',
        params: { roomTypeId, date: format(Date.now(), 'yyyy-MM-dd') },
      });
    }

    return {
      params: { roomTypeId, date },
    };
  },
  component: BookingMatrixPage,
});

export const bookingRouteTree = bookingRoute.addChildren([bookingMatrixRoute]);
