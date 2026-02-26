'use client';

import type { PriceData, LiquidityData } from '@/lib/types';

function fmt(n: number, decimals = 2): string {
  if (Math.abs(n) >= 1_000_000_000) return `$${(n / 1_000_000_000).toFixed(decimals)}B`;
  if (Math.abs(n) >= 1_000_000) return `$${(n / 1_000_000).toFixed(decimals)}M`;
  if (Math.abs(n) >= 1_000) return `$${(n / 1_000).toFixed(decimals)}K`;
  return `$${n.toFixed(decimals)}`;
}

function pct(n: number): string {
  const sign = n >= 0 ? '+' : '';
  return `${sign}${n.toFixed(1)}%`;
}

function PriceChange({ value, label }: { value: number; label: string }) {
  const color = value >= 0 ? 'text-green-400' : 'text-red-400';
  return (
    <div className="text-center">
      <div className={`text-sm font-medium ${color}`}>{pct(value)}</div>
      <div className="text-xs text-[var(--fg-muted)]">{label}</div>
    </div>
  );
}

export function HeroBar({ price, liquidity }: { price: PriceData | null; liquidity: LiquidityData | null }) {
  if (!price) return null;

  const athGainRequired = price.ath > 0 ? ((price.ath / price.price - 1) * 100) : 0;

  return (
    <div className="section-block">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
        <div>
          <div className="text-xs text-[var(--fg-muted)] uppercase tracking-widest mb-1">SPX6900 Price</div>
          <div className="text-3xl sm:text-4xl font-bold tracking-tight">
            ${price.price < 1 ? price.price.toFixed(4) : price.price.toFixed(2)}
          </div>
        </div>
        <div className="flex gap-6">
          <PriceChange value={price.price_change_24h} label="24h" />
          <PriceChange value={price.price_change_7d} label="7d" />
          <PriceChange value={price.price_change_30d} label="30d" />
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-[var(--border)]">
        <div>
          <div className="text-xs text-[var(--fg-muted)]">Market Cap</div>
          <div className="text-sm font-medium">{fmt(price.market_cap)}</div>
        </div>
        <div>
          <div className="text-xs text-[var(--fg-muted)]">24h Trading Volume</div>
          <div className="text-sm font-medium">{fmt(price.volume_24h)}</div>
        </div>
        <div>
          <div className="text-xs text-[var(--fg-muted)]">Down From All-Time High</div>
          <div className="text-sm font-medium text-red-400">{pct(price.ath_change_percentage)}</div>
        </div>
        <div>
          <div className="text-xs text-[var(--fg-muted)]">Gain Needed to Reach ATH</div>
          <div className="text-sm font-medium text-amber-400">+{athGainRequired.toFixed(0)}%</div>
        </div>
      </div>

      {liquidity && (
        <div className="grid grid-cols-2 gap-4 pt-3 mt-3 border-t border-[var(--border)]">
          <div>
            <div className="text-xs text-[var(--fg-muted)]">DEX Liquidity</div>
            <div className="text-sm font-medium">{fmt(liquidity.dex_liquidity_usd)}</div>
            <div className="text-[10px] text-[var(--fg-muted)]">Money available for trading</div>
          </div>
          <div>
            <div className="text-xs text-[var(--fg-muted)]">DEX 24h Volume</div>
            <div className="text-sm font-medium">{fmt(liquidity.volume_24h)}</div>
            <div className="text-[10px] text-[var(--fg-muted)]">Traded on decentralized exchanges today</div>
          </div>
        </div>
      )}
    </div>
  );
}
