import { Card, CardContent } from '../ui/card';
import BookingMatrixWithData from './bookingMatrixWithData';

export default function BookingMatrixCard() {
  return (
    <Card>
      <CardContent>
        <BookingMatrixWithData />
      </CardContent>
    </Card>
  );
}
