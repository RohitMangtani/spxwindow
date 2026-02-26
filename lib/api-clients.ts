import { SPX_COINGECKO_ID, SPX_ETH_CONTRACT, SPX_BASE_CONTRACT } from './static-data';

const COINGECKO_BASE = 'https://api.coingecko.com/api/v3';
const DEXSCREENER_BASE = 'https://api.dexscreener.com/latest/dex';

export async function fetchCoinGeckoPrice() {
  const res = await fetch(
    `${COINGECKO_BASE}/coins/${SPX_COINGECKO_ID}?localization=false&tickers=false&community_data=false&developer_data=false`,
    { next: { revalidate: 60 } }
  );
  if (!res.ok) throw new Error(`CoinGecko error: ${res.status}`);
  const data = await res.json();
  const md = data.market_data;
  return {
    price: md.current_price.usd,
    price_change_24h: md.price_change_percentage_24h,
    price_change_7d: md.price_change_percentage_7d,
    price_change_30d: md.price_change_percentage_30d,
    market_cap: md.market_cap.usd,
    volume_24h: md.total_volume.usd,
    ath: md.ath.usd,
    ath_change_percentage: md.ath_change_percentage.usd,
    last_updated: data.last_updated,
  };
}

export async function fetchCoinGeckoHistory(days: number = 90) {
  const res = await fetch(
    `${COINGECKO_BASE}/coins/${SPX_COINGECKO_ID}/market_chart?vs_currency=usd&days=${days}`,
    { next: { revalidate: 300 } }
  );
  if (!res.ok) throw new Error(`CoinGecko history error: ${res.status}`);
  const data = await res.json();
  return data.prices.map(([timestamp, price]: [number, number]) => ({
    date: new Date(timestamp).toISOString().split('T')[0],
    price,
  }));
}

export async function fetchDexScreenerLiquidity() {
  const res = await fetch(
    `${DEXSCREENER_BASE}/tokens/${SPX_ETH_CONTRACT}`,
    { next: { revalidate: 30 } }
  );
  if (!res.ok) throw new Error(`DexScreener error: ${res.status}`);
  const data = await res.json();
  const pair = data.pairs?.[0];
  if (!pair) throw new Error('No pair found');
  return {
    dex_liquidity_usd: pair.liquidity?.usd ?? 0,
    volume_24h: pair.volume?.h24 ?? 0,
    pair_address: pair.pairAddress,
    price_usd: pair.priceUsd ? parseFloat(pair.priceUsd) : 0,
    last_updated: new Date().toISOString(),
  };
}

export async function fetchEtherscanHolders(): Promise<number> {
  try {
    const res = await fetch(
      `https://api.etherscan.io/api?module=token&action=tokenholdercount&contractaddress=${SPX_ETH_CONTRACT}`,
      { next: { revalidate: 300 } }
    );
    if (!res.ok) return 0;
    const data = await res.json();
    const parsed = parseInt(data.result, 10);
    return isNaN(parsed) ? 0 : parsed;
  } catch {
    return 0;
  }
}

export async function fetchBasescanHolders(): Promise<number> {
  try {
    const res = await fetch(
      `https://api.basescan.org/api?module=token&action=tokenholdercount&contractaddress=${SPX_BASE_CONTRACT}`,
      { next: { revalidate: 300 } }
    );
    if (!res.ok) return 0;
    const data = await res.json();
    const parsed = parseInt(data.result, 10);
    return isNaN(parsed) ? 0 : parsed;
  } catch {
    return 0;
  }
}
