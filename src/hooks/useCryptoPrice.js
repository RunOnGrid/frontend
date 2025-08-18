import { useState, useEffect } from 'react';

export const useCryptoPrice = (cryptoId) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPrice = async () => {
    if (!cryptoId) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/crypto-price?id=${cryptoId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching crypto price:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrice();
  }, [cryptoId]);

  const refresh = () => {
    fetchPrice();
  };

  return {
    data,
    loading,
    error,
    refresh
  };
};

export const useFluxPrice = () => {
  return useCryptoPrice('3029');
};

export const useAkashPrice = () => {
  return useCryptoPrice('7083');
};
