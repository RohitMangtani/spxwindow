'use client';

import { useState, useEffect, useCallback } from 'react';
import type { PriceData, HolderData, LiquidityData } from './types';

export function useSpxData() {
  const [price, setPrice] = useState<PriceData | null>(null);
  const [holders, setHolders] = useState<HolderData | null>(null);
  const [liquidity, setLiquidity] = useState<LiquidityData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = useCallback(async () => {
    try {
      const [priceRes, holdersRes, liquidityRes] = await Promise.all([
        fetch('/api/spx/price'),
        fetch('/api/spx/holders'),
        fetch('/api/spx/liquidity'),
      ]);
      if (priceRes.ok) setPrice(await priceRes.json());
      if (holdersRes.ok) setHolders(await holdersRes.json());
      if (liquidityRes.ok) setLiquidity(await liquidityRes.json());
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
    const interval = setInterval(fetchAll, 60_000);
    return () => clearInterval(interval);
  }, [fetchAll]);

  return { price, holders, liquidity, loading, error, refetch: fetchAll };
}
