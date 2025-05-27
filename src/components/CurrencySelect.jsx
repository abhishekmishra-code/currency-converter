import React from "react";

const CurrencySelect = ({
  selectedCurrency,
  handleCurrency,
  currencyCodes,
}) => {
  const countryCode = selectedCurrency.substring(0, 2);

  return (
    <div className="flex flex-col min-h-11 max-w-32 w-full items-center rounded-md border border-[rgba(255,255,255,0.5)] bg-[rgba(255,255,255,0.1)] px-2.5">
      <img
        className="w-full"
        src={`https://flagsapi.com/${countryCode}/flat/64.png`}
        alt={`${countryCode} flag`}
      />
      <label htmlFor="fromCurrency" className="sr-only">
        Choose currency
      </label>
      <select
        name="fromCurrency"
        id="fromCurrency"
        className="border-none bg-none font-medium outline-none mb-2"
        value={selectedCurrency}
        onChange={handleCurrency}
      >
        {currencyCodes.map((currencyCode) => (
          <option className="text-gray-950" key={currencyCode} value={currencyCode}>
            {currencyCode}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CurrencySelect;
