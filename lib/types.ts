export interface PriceData {
  price: number;
  price_change_24h: number;
  price_change_7d: number;
  price_change_30d: number;
  market_cap: number;
  volume_24h: number;
  ath: number;
  ath_change_percentage: number;
  last_updated: string;
}

export interface HolderData {
  eth_holders: number;
  base_holders: number;
  total_estimated: number;
  last_updated: string;
}

export interface LiquidityData {
  dex_liquidity_usd: number;
  volume_24h: number;
  pair_address: string;
  last_updated: string;
}

export interface HistoryPoint {
  date: string;
  price: number;
}

export type ConditionStatus = 'pass' | 'fail' | 'active' | 'warning';

export interface Condition {
  id: string;
  label: string;
  description: string;
  status: ConditionStatus;
  live?: boolean;
}

export interface WhaleEntry {
  category: 'accumulating' | 'mixed_accumulating' | 'holding' | 'distributing';
  count: number;
  percentage: number;
}

export interface ScenarioTarget {
  label: string;
  market_cap: number;
  price: number;
  multiple: string;
  probability?: number;
}

export interface PeerComparison {
  name: string;
  ticker: string;
  market_cap: string;
  ath_drawdown: string;
  one_year_return: string;
  vc_backed: boolean;
}
