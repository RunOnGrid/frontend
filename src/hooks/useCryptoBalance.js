import { useState, useEffect } from 'react';

// Hook para obtener balance de FLUX
export const useFluxBalance = (address) => {
    const [balance, setBalance] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchBalance = async () => {
        if (!address) return;
        
        setLoading(true);
        setError(null);
        
        try {
          const response = await fetch(`/api/flux/balance-flux?address=${address}`);
          if (!response.ok) throw new Error('Failed to fetch FLUX Balance');
          
          const data = await response.json();
          setBalance(data.balance || 0);
        } catch (error) {
          console.error('Error fetching FLUX balance:', error);
          setError(error.message);
          setBalance(0);
        } finally {
          setLoading(false);
        }
      };
  
      fetchBalance();
    }, [address]);
  
    return { balance, loading, error };
  };
  
  // Hook para obtener balance de AKASH
  export const useAkashBalance = (address) => {
    const [balance, setBalance] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchBalance = async () => {
        if (!address) return;
        
        setLoading(true);
        setError(null);
        
        try {
          const response = await fetch(`/api/akash/balance-akash?address=${address}`);
          if (!response.ok) throw new Error('Failed to fetch AKASH Balance');
          
          const data = await response.json();
          setBalance(data.balance || 0);
        } catch (error) {
          console.error('Error fetching AKASH balance:', error);
          setError(error.message);
          setBalance(0);
        } finally {
          setLoading(false);
        }
      };
  
      fetchBalance();
    }, [address]);
  
    return { balance, loading, error };
  };
  
  
  
  