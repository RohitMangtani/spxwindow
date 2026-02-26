'use client';

import { DHI_DATA, SCORES } from '@/lib/static-data';
import type { HolderData } from '@/lib/types';

function GaugeBar({ value, max, label, color }: { value: number; max: number; label: string; color: string }) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-[var(--fg-muted)]">{label}</span>
        <span className="font-medium">{value.toFixed(1)}%</span>
      </div>
      <div className="h-2 rounded-full bg-[var(--bg-accent)]">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function getGaugeColor(value: number): string {
  if (value >= 80) return 'bg-green-500';
  if (value >= 60) return 'bg-amber-500';
  return 'bg-red-500';
}

export function ConvictionGauge({ holders }: { holders: HolderData | null }) {
  return (
    <div className="section-block space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-[var(--fg-muted)]">Diamond Hands Index</h2>
        <span className="text-xs text-[var(--fg-muted)]">Updated {DHI_DATA.last_updated}</span>
      </div>

      <div className="space-y-3">
        <GaugeBar value={DHI_DATA.dhi_by_holders} max={100} label="DHI by Holders" color={getGaugeColor(DHI_DATA.dhi_by_holders)} />
        <GaugeBar value={DHI_DATA.dhi_by_supply} max={100} label="DHI by Supply" color={getGaugeColor(DHI_DATA.dhi_by_supply)} />
      </div>

      <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[var(--border)]">
        <div>
          <div className="text-xs text-[var(--fg-muted)]">Buyer/Seller Ratio</div>
          <div className={`text-lg font-bold ${DHI_DATA.buyer_seller_ratio >= 1 ? 'text-green-400' : 'text-red-400'}`}>
            {DHI_DATA.buyer_seller_ratio.toFixed(2)}x
          </div>
        </div>
        <div>
          <div className="text-xs text-[var(--fg-muted)]">Conviction Score</div>
          <div className="text-lg font-bold">{SCORES.conviction_score} / 10</div>
        </div>
      </div>

      {holders && (
        <div className="pt-3 border-t border-[var(--border)]">
          <div className="text-xs text-[var(--fg-muted)] mb-2">Live Holder Count</div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="text-xs text-[var(--fg-muted)]">ETH</div>
              <div className="text-sm font-medium">{holders.eth_holders.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-xs text-[var(--fg-muted)]">Base</div>
              <div className="text-sm font-medium">{holders.base_holders.toLocaleString()}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
