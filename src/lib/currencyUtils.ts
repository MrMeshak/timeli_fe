export function formatCurrency(cents, currency = 'USD', local = 'en-US') {
  return new Intl.NumberFormat(local, { style: 'currency', currency }).format(
    cents / 100,
  );
}
