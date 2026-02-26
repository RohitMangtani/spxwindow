'use client';

import { VOLATILITY_DATA } from '@/lib/static-data';
import type { PriceData } from '@/lib/types';

function ComparisonBar({ label, items }: {
  label: string;
  items: { name: string; val: number; color: string }[];
}) {
  const max = Math.max(...items.map(i => Math.abs(i.val)));
  return (
    <div className="space-y-1">
      <div className="text-xs text-[var(--fg-muted)]">{label}</div>
      {items.map(item => (
        <div key={item.name} className="flex items-center gap-2">
          <span className="text-[10px] w-6 text-[var(--fg-muted)]">{item.name}</span>
          <div className="flex-1 h-2 rounded-full bg-[var(--bg-accent)]">
            <div
              className={`h-full rounded-full ${item.color}`}
              style={{ width: `${(Math.abs(item.val) / max) * 100}%` }}
            />
          </div>
          <span className="text-[10px] font-mono w-16 text-right">{Math.abs(item.val).toFixed(1)}%</span>
        </div>
      ))}
    </div>
  );
}

export function VolatilityRisk({ price }: { price: PriceData | null }) {
  const d = VOLATILITY_DATA;
  const athGain = price && price.ath > 0 ? ((price.ath / price.price - 1) * 100) : 574;

  return (
    <div className="section-block space-y-4">
      <h2 className="text-sm font-semibold uppercase tracking-widest text-[var(--fg-muted)]">Volatility & Risk</h2>

      <ComparisonBar
        label="Annualized Volatility"
        items={[
          { name: 'SPX', val: d.annualized_vol, color: 'bg-blue-500' },
          { name: 'ETH', val: d.eth_annualized_vol, color: 'bg-zinc-500' },
          { name: 'BTC', val: d.btc_annualized_vol, color: 'bg-zinc-600' },
        ]}
      />

      <ComparisonBar
        label="Max Drawdown"
        items={[
          { name: 'SPX', val: d.max_drawdown, color: 'bg-red-500' },
          { name: 'ETH', val: d.eth_max_drawdown, color: 'bg-red-400/60' },
          { name: 'BTC', val: d.btc_max_drawdown, color: 'bg-red-300/40' },
        ]}
      />

      <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[var(--border)]">
        <div>
          <div className="text-xs text-[var(--fg-muted)]">VaR 95% (daily)</div>
          <div className="text-lg font-bold text-red-400">{d.var_95}%</div>
        </div>
        <div>
          <div className="text-xs text-[var(--fg-muted)]">To Return to ATH</div>
          <div className="text-lg font-bold text-amber-400">+{athGain.toFixed(0)}%</div>
        </div>
      </div>
    </div>
  );
}
