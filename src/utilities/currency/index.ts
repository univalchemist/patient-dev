export const handleCurrencyCalculation = (
  amount: number,
  rate: { usd: number; eur: number },
  currency: 'EUR' | 'USD' | 'CHF' = 'CHF'
): number => {
  let formattedAmount = 0;
  const { usd, eur } = rate;

  if (currency === 'EUR') {
    formattedAmount = amount * eur;
  }
  if (currency === 'USD') {
    formattedAmount = amount * usd;
  }

  if (currency === 'CHF') {
    formattedAmount = amount; // Assumes the amount is already in euros for other currencies
  }

  return Number((+formattedAmount).toFixed(2));
};
