'use client';

import { DHI_DATA, SCORES } from '@/lib/static-data';
import type { HolderData } from '@/lib/types';

function GaugeBar({ value, max, label, sublabel, color }: { value: number; max: number; label: string; sublabel?: string; color: string }) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <div>
          <span className="text-[var(--fg-muted)]">{label}</span>
          {sublabel && <span className="text-[10px] text-[var(--fg-muted)] ml-1">({sublabel})</span>}
        </div>
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

function getConvictionLabel(score: number): string {
  if (score >= 8) return 'Very Strong';
  if (score >= 6) return 'Strong';
  if (score >= 4) return 'Moderate';
  return 'Weak';
}

export function ConvictionGauge({ holders }: { holders: HolderData | null }) {
  return (
    <div className="section-block space-y-4">
      <div>
        <h2 className="text-sm font-semibold uppercase tracking-widest text-[var(--fg-muted)]">Holder Conviction</h2>
        <p className="text-xs text-[var(--fg-muted)] mt-1">Are holders diamond-handing or paper-handing? Higher = more holders refusing to sell.</p>
      </div>

      <div className="space-y-3">
        <GaugeBar
          value={DHI_DATA.dhi_by_holders}
          max={100}
          label="Holders Not Selling"
          sublabel="by wallet count"
          color={getGaugeColor(DHI_DATA.dhi_by_holders)}
        />
        <GaugeBar
          value={DHI_DATA.dhi_by_supply}
          max={100}
          label="Supply Being Held"
          sublabel="by token amount"
          color={getGaugeColor(DHI_DATA.dhi_by_supply)}
        />
      </div>

      <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[var(--border)]">
        <div>
          <div className="text-xs text-[var(--fg-muted)]">Buyers vs Sellers</div>
          <div className={`text-lg font-bold ${DHI_DATA.buyer_seller_ratio >= 1 ? 'text-green-400' : 'text-red-400'}`}>
            {DHI_DATA.buyer_seller_ratio.toFixed(2)}x
          </div>
          <div className="text-[10px] text-[var(--fg-muted)]">
            {DHI_DATA.buyer_seller_ratio >= 1 ? 'More buyers than sellers' : 'More sellers than buyers'}
          </div>
        </div>
        <div>
          <div className="text-xs text-[var(--fg-muted)]">Overall Conviction</div>
          <div className="text-lg font-bold">{SCORES.conviction_score} / 10</div>
          <div className="text-[10px] text-[var(--fg-muted)]">{getConvictionLabel(SCORES.conviction_score)}</div>
        </div>
      </div>

      {holders && (
        <div className="pt-3 border-t border-[var(--border)]">
          <div className="text-xs text-[var(--fg-muted)] mb-2">Live Holder Count</div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="text-xs text-[var(--fg-muted)]">Ethereum Chain</div>
              <div className="text-sm font-medium">{(holders.eth_holders ?? 0).toLocaleString()}</div>
            </div>
            <div>
              <div className="text-xs text-[var(--fg-muted)]">Base Chain</div>
              <div className="text-sm font-medium">{(holders.base_holders ?? 0).toLocaleString()}</div>
            </div>
          </div>
        </div>
      )}

      <div className="text-[10px] text-[var(--fg-muted)]">
        Research snapshot from {DHI_DATA.last_updated}. Holder counts update live.
      </div>
    </div>
  );
}
