import { Condition, WhaleEntry, ScenarioTarget, PeerComparison } from './types';

export const SPX_ETH_CONTRACT = '0xE0f63A424a4439cBE457D80E4f4b51aD25b2c56C';
export const SPX_BASE_CONTRACT = '0x50dA645f148798F68EF2d7dB7C1CB22A6819bb2C';
export const SPX_COINGECKO_ID = 'spx6900';

export const MAX_SUPPLY = 1_000_000_000;
export const CIRCULATING_SUPPLY = 930_993_081;
export const BURNED_SUPPLY = 69_006_919;
export const LP_LOCK_YEARS = 67;
export const BUY_SELL_TAX = 0;

export const N_CONDITIONS: Condition[] = [
  { id: 'N1', label: 'No Cash Flows', description: 'No dividends, interest, or revenue share', status: 'pass' },
  { id: 'N2', label: 'No Utility', description: 'No service, access, or governance rights', status: 'pass' },
  { id: 'N3', label: 'No External Anchor', description: 'Price not tied to earnings, assets, or commodities', status: 'pass' },
  { id: 'N4', label: 'Positive Market Cap', description: 'Trades above $0 with liquidity', status: 'pass', live: true },
  { id: 'N5', label: 'Multiple Holders', description: '>1,000 unique wallets', status: 'pass', live: true },
];

export const C_CONDITIONS: Condition[] = [
  { id: 'C1', label: 'Coordination Persistence', description: 'Survived >6 months with active participants', status: 'pass' },
  { id: 'C2', label: 'Unresolved Ambiguity', description: 'No authority can validate or invalidate claims', status: 'pass' },
  { id: 'C3', label: 'Perceived Threat', description: 'Drawdowns or criticism create stress', status: 'active', live: true },
  { id: 'C4', label: 'Community Infrastructure', description: 'Telegram, Twitter, Discord channels exist', status: 'pass' },
  { id: 'C5', label: 'Sunk Participation', description: 'Participants invested time, capital, or identity', status: 'pass' },
];

export const DHI_DATA = {
  dhi_by_holders: 86.93,
  dhi_by_supply: 46.7,
  buyer_seller_ratio: 1.24,
  holder_growth_90d_base: 9.2,
  holder_growth_90d_eth: 2.94,
  last_updated: '2026-01-30',
};

export const WHALE_DATA: WhaleEntry[] = [
  { category: 'accumulating', count: 6, percentage: 30 },
  { category: 'mixed_accumulating', count: 10, percentage: 50 },
  { category: 'holding', count: 3, percentage: 15 },
  { category: 'distributing', count: 1, percentage: 5 },
];
export const WHALE_NET_FLOW = 11_600_000;
export const WHALE_TOP10_CONCENTRATION = 64;
export const WHALE_LAST_UPDATED = '2026-01-30';

export const CORRELATION_DATA = {
  eth_correlation: 0.759,
  btc_correlation: 0.716,
  beta_eth: 1.63,
  beta_btc: 2.79,
  beta_market: 2.24,
  upside_capture: 2.58,
  downside_capture: 2.68,
  rolling_30d_avg: 0.77,
  last_updated: '2026-01-30',
};

export const VOLATILITY_DATA = {
  daily_vol: 8.42,
  annualized_vol: 160.8,
  var_95: -12.8,
  max_drawdown: -85.2,
  eth_annualized_vol: 75.0,
  btc_annualized_vol: 41.5,
  eth_max_drawdown: -55.4,
  btc_max_drawdown: -34.1,
  last_updated: '2026-01-30',
};

export const SCENARIO_TARGETS: ScenarioTarget[] = [
  { label: 'Return to ATH', market_cap: 2_100_000_000, price: 2.27, multiple: '3.4x', probability: 25 },
  { label: '= PEPE Market Cap', market_cap: 2_000_000_000, price: 2.15, multiple: '3.2x' },
  { label: '= SHIB Market Cap', market_cap: 4_400_000_000, price: 4.73, multiple: '7x', probability: 12 },
  { label: '= DOGE Market Cap', market_cap: 19_500_000_000, price: 20.95, multiple: '31x' },
];

export const PROBABILITY_SCENARIOS = [
  { label: '2-3x Rally', probability: 40, color: '#22c55e' },
  { label: 'Return to ATH', probability: 25, color: '#3b82f6' },
  { label: '10x+ Squeeze', probability: 12, color: '#a855f7' },
  { label: 'Decline / Stagnation', probability: 25, color: '#ef4444' },
];

export const PEER_COMPARISONS: PeerComparison[] = [
  { name: 'SPX6900', ticker: 'SPX', market_cap: '$620M', ath_drawdown: '-70%', one_year_return: '+950%', vc_backed: false },
  { name: 'Dogecoin', ticker: 'DOGE', market_cap: '$19.5B', ath_drawdown: '-82%', one_year_return: '-65%', vc_backed: false },
  { name: 'Shiba Inu', ticker: 'SHIB', market_cap: '$4.4B', ath_drawdown: '-91%', one_year_return: '-70%', vc_backed: false },
  { name: 'PEPE', ticker: 'PEPE', market_cap: '$2.0B', ath_drawdown: '-80%', one_year_return: '-80%', vc_backed: false },
  { name: 'Bonk', ticker: 'BONK', market_cap: '$740M', ath_drawdown: '-83%', one_year_return: '-60%', vc_backed: false },
  { name: 'dogwifhat', ticker: 'WIF', market_cap: '$285M', ath_drawdown: '-92%', one_year_return: '-85%', vc_backed: false },
];

export const INVALIDATION_THRESHOLDS = {
  holder_floor: 1_000,
  liquidity_floor: 100_000,
  volume_floor: 100_000,
};

export const SCORES = {
  squeeze_score: 6.5,
  conviction_score: 8.2,
  honest_gambling_score: 10.0,
};
