export function formatMinsToHHMM(mins: number) {
  return (
    String(Math.floor(mins / 60)) + ':' + String(mins % 60).padStart(2, '0')
  );
}
