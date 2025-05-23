import React, { useState } from "react";
import CurrencySelect from "./CurrencySelect";

const ConverterForm = () => {
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const getExchangeRate = () => {
    const API_URL = `https://v6.exchangerate-api.com/v6/d76c986319ec5ff2cb219429/latest/USD`
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    getExchangeRate();
  };

  return (
    <form action="" className="mt-11" onSubmit={handleFormSubmit}>
      <div>
        <label htmlFor="amount" className="mb-2.5 block font-medium">
          Enter Amount
        </label>
        <input
          type="number"
          id="amount"
          name="amount"
          className="min-h-12 w-full rounded-md border border-[rgba(255,255,255,0.5)] bg-[rgba(255,255,255,0.1)] text-[1.1rem] outline-none"
        />
      </div>

      <div className="mt-4 flex flex-row items-center justify-between gap-4">
        <div className="mb-7 flex flex-col">
          <label htmlFor="fromCurrency">From</label>
          <CurrencySelect
            selectedCurrency={fromCurrency}
            handleCurrency={(e) => setFromCurrency(e.target.value)}
          />
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
          <label htmlFor="fromCurrency">To</label>
          <CurrencySelect
            selectedCurrency={toCurrency}
            handleCurrency={(e) => setToCurrency(e.target.value)}
          />
        </div>
      </div>
      <button
        type="submit"
        className="min-h-12 w-full cursor-pointer rounded-md bg-[rgba(255,255,255,0.1)] font-semibold duration-200 ease-in-out hover:bg-[rgba(255,255,255,0.8)] hover:text-gray-900"
      >
        Get Exchange Rate
      </button>
      <p className="mt-7 rounded-md bg-[rgba(255,255,255,0.15)] py-6 text-center text-xl font-medium tracking-[0.5px]">
        1000 USD = 8000 INR
      </p>
    </form>
  );
};

export default ConverterForm;
