import React, { useCallback, useEffect, useState } from 'react';
import { InfoIcon } from 'components/svg';
import { TNote } from 'components/custom/currency-feedback/types';
import {
  NoteMain,
  NoteText,
  HighlightText,
} from 'components/custom/currency-feedback/style';
import { useAppContext } from 'context';
import { handleCurrencyCalculation } from 'utilities/currency';

const CurrencyFeedback = ({ value, ...props }: TNote) => {
  const { currency, currencyRate } = useAppContext();

  const [euroValue, setEuroValue] = useState(0);
  const [usdValue, setUsdValue] = useState(0);

  const handleCurrency = useCallback(async () => {
    const convert = handleCurrencyCalculation(value, currencyRate, currency as 'EUR' | 'USD' | 'CHF');
    if (currency === 'EUR') {
      setEuroValue(convert);
    }
    if (currency === 'USD') {
      setUsdValue(convert);
    }
  }, [currency, value]);

  useEffect(() => {
    handleCurrency();
  }, [value, currency]);

  return (
    <NoteMain {...props}>
      {currency === 'EUR' && parseInt(value, 10) > 0 ? (
        <>
          <InfoIcon />
          <NoteText>
            Approximatelay
            <HighlightText> {euroValue} EUR</HighlightText>.
          </NoteText>
        </>
      ) : null}
      {currency === 'USD' && parseInt(value, 10) > 0 ? (
        <>
          <InfoIcon />
          <NoteText>
            Approximatelay
            <HighlightText> {usdValue} USD</HighlightText>.
          </NoteText>
        </>
      ) : null}
    </NoteMain>
  );
};

export default CurrencyFeedback;
