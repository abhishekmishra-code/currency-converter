import { useEffect, useState } from "react";

const API_KEY = import.meta.env.VITE_EXCHANGE_API_KEY;
const BASE_CURRENCY = "USD";
const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${BASE_CURRENCY}`;

const useCurrencyData = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    const url = API_URL;
    const nowUnix = Date.now() / 1000;

    try {
      const localData = JSON.parse(localStorage.getItem("USDData"));

      if (!localData || localData.time_next_update_unix < nowUnix) {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Status: ${response.status}`);
        const json = await response.json();

        localStorage.setItem("USDData", JSON.stringify(json)); // 🌐 Cached
        setData(json);
      } else {
        setData(localData); // 📦 Use cached version
      }

      setError(false);
      return true; // ✅ Success
    } catch (err) {
      console.error("Currency fetch error:", err);
      setError(true);
      setData(null);
      return false; // ❌ Failure
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, error, loading, refetch: fetchData };
};

export default useCurrencyData;