import { useRef, useEffect, useState, useCallback } from "react";
import ConverterForm from "./components/ConverterForm";
import Spinner from "./components/Spinner";
import useCurrencyData from "./hooks/useCurrencyData";
import Toast from "./components/Toast";

function App() {
  const [tooSlow, setTooSlow] = useState(false);
  const { data, error, loading, refetch } = useCurrencyData();
  const retryCoolDownRef = useRef(false);
  const [coolDownWarning, setCoolDownWarning] = useState(false);
  const [refreshed, setRefreshed] = useState(false);
  const [currencyCodes, setCurrencyCodes] = useState();

  const handleRetry = useCallback(() => {
    if (retryCoolDownRef.current) {
      setCoolDownWarning(true);
      setTimeout(() => setCoolDownWarning(false), 2000);
      return;
    }

    setTooSlow(false);

    retryCoolDownRef.current = true;

    refetch().then((success) => {
      if (success) {
        setRefreshed(true);
        setTimeout(() => setRefreshed(false), 2000);
      }
    });

    setTimeout(() => {
      retryCoolDownRef.current = false;
    }, 3000);
  }, [refetch]);

  useEffect(() => {
    if (data) {
      setCurrencyCodes(Object.keys(data.conversion_rates));
      return;
    }

    const timeout = setTimeout(() => {
      setTooSlow(true);
    }, 5000);

    return () => clearTimeout(timeout);
  }, [data]);

  return (
    <>
      <div
        className={`flex min-h-screen items-center justify-center bg-[#030728] bg-[url(./assets/bg.png)] text-gray-200`}
      >
        <div className="mx-4 w-full max-w-md rounded-lg border border-[#02072880] bg-[#02072880] px-8 pt-10 pb-12 shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-2xl">
          <h2 className="text-center text-2xl font-semibold">
            Currency Converter
          </h2>
          <div aria-busy={loading}>
            {loading ? (
              <>
                <Spinner />
                {tooSlow && (
                  <p
                    className="mt-2 text-center text-sm text-red-400"
                    aria-live="assertive"
                  >
                    This is taking longer than expected. Please check your
                    connection.
                  </p>
                )}
              </>
            ) : error ? (
              <>
                <p className="mt-6 text-center text-red-400">
                  Failed to load exchange rates. Please try again later.
                </p>
                <div className="mt-2 text-center">
                  <button
                    onClick={handleRetry}
                    className={`text-white/80 hover:underline ${
                      loading
                        ? "animate-pulse cursor-not-allowed opacity-50"
                        : ""
                    }`}
                  >
                    {loading ? "Retrying..." : "Retry"}
                  </button>
                  {coolDownWarning && (
                    <p
                      className="mt-2 text-xs font-medium text-yellow-400"
                      aria-live="assertive"
                    >
                      Please wait before retrying...
                    </p>
                  )}
                </div>
              </>
            ) : (
              data?.conversion_rates && (
                <>
                  <ConverterForm
                    currencyCodes={currencyCodes}
                    conversionRates={data.conversion_rates}
                  />
                  <p className="mt-4 text-center text-xs text-white/60">
                    Last updated:{" "}
                    {new Date(data.time_last_update_unix * 1000).toLocaleString(
                      "en-GB",
                    )}
                  </p>
                </>
              )
            )}
          </div>
        </div>
        <Toast show={refreshed} type="success">
          Exchange rates updated successfully!
        </Toast>
      </div>
    </>
  );
}

export default App;
