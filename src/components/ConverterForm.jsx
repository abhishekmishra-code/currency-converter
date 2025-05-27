import React, { useState } from "react";
import CurrencySelect from "./CurrencySelect";

const ConverterForm = ({ conversionRates, currencyCodes }) => {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");

  const handleSwapCurrencies = () => {
    const currentFrom = fromCurrency;
    const currentTo = toCurrency;
    setFromCurrency(currentTo);
    setToCurrency(currentFrom);
  };

  const getExchangeRate = () => {
    const fromRate = conversionRates[fromCurrency];
    const toRate = conversionRates[toCurrency];
    if (!fromRate || !toRate) return 0;
    return (amount / fromRate) * toRate;
  };

  const formatCurrency = (value, currency) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);

  return (
    <div className="mt-11">
      <div>
        <label
          htmlFor="amount"
          className="mb-2.5 block font-medium"
          aria-label="Amount to convert"
        >
          Enter Amount
        </label>
        <input
          type="number"
          id="amount"
          name="amount"
          min={1}
          value={amount}
          className="min-h-12 w-full rounded-md border border-[rgba(255,255,255,0.5)] bg-[rgba(255,255,255,0.1)] pl-2 text-[1.1rem] outline-none"
          onChange={(e) => {
            const value = Number(e.target.value);
            if (value >= 0) {
              setAmount(value);
            }
          }}
        />
      </div>

      <div className="xs:flex-row mt-4 flex flex-col items-center justify-around gap-4">
        <div className="mb-7 flex flex-col">
          <label htmlFor="fromCurrency" className="mb-1 text-center">
            From
          </label>
          {currencyCodes && (
            <CurrencySelect
              currencyCodes={currencyCodes}
              selectedCurrency={fromCurrency}
              handleCurrency={(e) => setFromCurrency(e.target.value)}
            />
          )}
        </div>

        {/* SVG swap icon */}
        <div
          onClick={handleSwapCurrencies}
          className="border-[rgba(255,255,255,0.5) flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border bg-[rgba(255,255,255,0.1)] duration-200 ease-in-out hover:bg-[rgba(255,255,255,0.3)]"
        >
          <svg
            className=""
            width="16"
            viewBox="0 0 20 19"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.13 11.66H.22a.22.22 0 0 0-.22.22v1.62a.22.22 0 0 0 .22.22h16.45l-3.92 4.94a.22.22 0 0 0 .17.35h1.97c.13 0 .25-.06.33-.16l4.59-5.78a.9.9 0 0 0-.7-1.43zM19.78 5.29H3.34L7.26.35A.22.22 0 0 0 7.09 0H5.12a.22.22 0 0 0-.34.16L.19 5.94a.9.9 0 0 0 .68 1.4H19.78a.22.22 0 0 0 .22-.22V5.51a.22.22 0 0 0-.22-.22z"
              fill="#fff"
            />
          </svg>
        </div>

        <div className="mb-7 flex flex-col">
          <label htmlFor="fromCurrency" className="mb-1 text-center">
            To
          </label>
          {currencyCodes && (
            <CurrencySelect
              currencyCodes={currencyCodes}
              selectedCurrency={toCurrency}
              handleCurrency={(e) => setToCurrency(e.target.value)}
            />
          )}
        </div>
      </div>

      <p className="mt-7 rounded-md bg-[rgba(255,255,255,0.15)] py-6 text-center text-xl font-medium tracking-[0.5px]">
        {!conversionRates[fromCurrency] || !conversionRates[toCurrency] ? (
          <span className="animate-pulse">Loading exchange rates...</span>
        ) : (
          `${amount} ${fromCurrency} = ${formatCurrency(getExchangeRate(), toCurrency)}`
        )}
      </p>
      <p className="mt-2 text-center text-sm opacity-70">
        Exchange rate: 1 {fromCurrency} ={" "}
        {(conversionRates[toCurrency] / conversionRates[fromCurrency]).toFixed(
          4,
        )}{" "}
        {toCurrency}
      </p>
    </div>
  );
};

export default ConverterForm;
