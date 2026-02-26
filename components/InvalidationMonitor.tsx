'use client';

import { INVALIDATION_THRESHOLDS } from '@/lib/static-data';
import type { HolderData, LiquidityData, PriceData } from '@/lib/types';

type Status = 'safe' | 'warning' | 'danger';

function getStatus(current: number, floor: number, warningMultiple: number = 5): Status {
  if (current <= floor) return 'danger';
  if (current <= floor * warningMultiple) return 'warning';
  return 'safe';
}

const STATUS_STYLES: Record<Status, string> = {
  safe: 'bg-green-500/15 text-green-400 border-green-500/30',
  warning: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
  danger: 'bg-red-500/15 text-red-400 border-red-500/30',
};

const STATUS_DOT: Record<Status, string> = {
  safe: 'bg-green-500',
  warning: 'bg-amber-500 animate-pulse',
  danger: 'bg-red-500 animate-pulse',
};

interface TriggerCheck {
  id: string;
  label: string;
  threshold: string;
  current: string;
  status: Status;
}

export function InvalidationMonitor({ holders, liquidity, price }: {
  holders: HolderData | null;
  liquidity: LiquidityData | null;
  price: PriceData | null;
}) {
  const t = INVALIDATION_THRESHOLDS;

  const checks: TriggerCheck[] = [
    {
      id: 'holders',
      label: 'ETH Holder Count',
      threshold: `> ${t.holder_floor.toLocaleString()}`,
      current: holders ? (holders.eth_holders ?? 0).toLocaleString() : '\u2014',
      status: holders ? getStatus(holders.eth_holders ?? 0, t.holder_floor, 10) : 'safe',
    },
    {
      id: 'liquidity',
      label: 'DEX Liquidity',
      threshold: `> $${(t.liquidity_floor / 1000).toFixed(0)}K`,
      current: liquidity ? `$${(liquidity.dex_liquidity_usd / 1e6).toFixed(2)}M` : '\u2014',
      status: liquidity ? getStatus(liquidity.dex_liquidity_usd, t.liquidity_floor, 10) : 'safe',
    },
    {
      id: 'volume',
      label: 'Daily Volume',
      threshold: `> $${(t.volume_floor / 1000).toFixed(0)}K`,
      current: price ? `$${(price.volume_24h / 1e6).toFixed(2)}M` : '\u2014',
      status: price ? getStatus(price.volume_24h, t.volume_floor, 10) : 'safe',
    },
  ];

  const anyDanger = checks.some(c => c.status === 'danger');

  return (
    <div className={`section-block space-y-4 ${anyDanger ? 'border-red-500/50' : ''}`}>
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-[var(--fg-muted)]">Invalidation Monitor</h2>
        {anyDanger && (
          <span className="text-xs px-2 py-1 rounded-full bg-red-500/15 text-red-400 border border-red-500/30 animate-pulse">
            ALERT
          </span>
        )}
      </div>

      <div className="space-y-2">
        {checks.map(check => (
          <div key={check.id} className={`flex items-center justify-between px-3 py-2 rounded-lg border ${STATUS_STYLES[check.status]}`}>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${STATUS_DOT[check.status]}`} />
              <span className="text-xs font-medium">{check.label}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[10px] text-[var(--fg-muted)]">Floor: {check.threshold}</span>
              <span className="text-xs font-mono font-medium">{check.current}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="text-[10px] text-[var(--fg-muted)]">
        Thesis invalidated if any trigger breaches floor for 30+ consecutive days.
      </div>
    </div>
  );
}
