export default function BookingMatrixTimeAxis() {
  const startHr = Number(import.meta.env.VITE_BOOKING_START_HR);
  const endHr = Number(import.meta.env.VITE_BOOKING_END_HR);
  const times = Array.from({ length: endHr - startHr }, (_, i) => startHr + i);

  return (
    <div className="flex flex-col items-stretch gap-2">
      <div className="h-8"></div>
      {times.map((hr) => (
        <div className="mx-2 w-12 flex-1 border-t-2 md:w-15">
          <p className="bg-background text-muted-foreground rounded-md">
            {hr}:00
          </p>
        </div>
      ))}
    </div>
  );
}
