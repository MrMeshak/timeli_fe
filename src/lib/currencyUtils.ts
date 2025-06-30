export function formatCurrency(
  cents: number,
  currency = 'USD',
  local = 'en-US',
) {
  return new Intl.NumberFormat(local, { style: 'currency', currency }).format(
    cents / 100,
  );
}

export function formatCurrencyRoundedDollars(
  cents: number,
  currency = 'USD',
  local = 'en-US',
) {
  return new Intl.NumberFormat(local, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(cents / 100);
}
