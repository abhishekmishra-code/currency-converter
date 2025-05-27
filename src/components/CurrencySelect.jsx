import React from "react";

const CurrencySelect = ({ selectedCurrency, handleCurrency, currencyCodes}) => {

  const countryCode = selectedCurrency.substring(0, 2);

  return (
    <div className="flex min-h-11 items-center rounded-md border border-[rgba(255,255,255,0.5)] bg-[rgba(255,255,255,0.1)] px-2.5">
      <img
        className="w-6"
        src={`https://flagsapi.com/${countryCode}/flat/64.png`}
        alt="US flag"
      />
      <select
        name="fromCurrency"
        id="fromCurrency"
        className="border-none bg-none font-medium outline-none"
        value={selectedCurrency}
        onChange={handleCurrency}
      >
        {currencyCodes.map((currencyCode, index) => (
          <option className="text-gray-950" key={index} value={currencyCode}>
            {currencyCode}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CurrencySelect;
