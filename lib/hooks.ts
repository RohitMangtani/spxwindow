'use client';

import { useState, useEffect, useCallback } from 'react';
import type { PriceData, HolderData, LiquidityData, HistoryPoint } from './types';

export function useSpxData() {
  const [price, setPrice] = useState<PriceData | null>(null);
  const [holders, setHolders] = useState<HolderData | null>(null);
  const [liquidity, setLiquidity] = useState<LiquidityData | null>(null);
  const [history, setHistory] = useState<HistoryPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = useCallback(async () => {
    try {
      const [priceRes, holdersRes, liquidityRes, historyRes] = await Promise.all([
        fetch('/api/spx/price'),
        fetch('/api/spx/holders'),
        fetch('/api/spx/liquidity'),
        fetch('/api/spx/history?days=90'),
      ]);
      if (priceRes.ok) setPrice(await priceRes.json());
      if (holdersRes.ok) setHolders(await holdersRes.json());
      if (liquidityRes.ok) setLiquidity(await liquidityRes.json());
      if (historyRes.ok) {
        const data = await historyRes.json();
        if (Array.isArray(data)) setHistory(data);
      }
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

  return { price, holders, liquidity, history, loading, error, refetch: fetchAll };
}
