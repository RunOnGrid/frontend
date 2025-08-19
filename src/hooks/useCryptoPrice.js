import { useState, useEffect } from 'react';

// Hook principal para obtener precios de criptomonedas
export const useCryptoPrice = (cryptoId) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrice = async () => {
      if (!cryptoId) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/crypto-price?id=${cryptoId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result.data.statistics.price);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPrice();
  }, [cryptoId]); // Solo se ejecuta cuando cambia cryptoId

  return {
    data,
    loading,
    error,
  };
};

// Hook específico para FLUX (ID: 3029)
export const useFluxPrice = () => {
  return useCryptoPrice('3029');
};

// Hook específico para AKASH (ID: 7083)
export const useAkashPrice = () => {
  return useCryptoPrice('7083');
};

