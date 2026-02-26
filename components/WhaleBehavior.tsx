'use client';

import { WHALE_DATA, WHALE_NET_FLOW, WHALE_TOP10_CONCENTRATION, WHALE_LAST_UPDATED } from '@/lib/static-data';

const CATEGORY_COLORS: Record<string, string> = {
  accumulating: 'bg-green-500',
  mixed_accumulating: 'bg-green-400/60',
  holding: 'bg-zinc-500',
  distributing: 'bg-red-500',
};

const CATEGORY_LABELS: Record<string, string> = {
  accumulating: 'Buying More',
  mixed_accumulating: 'Mostly Buying',
  holding: 'Holding Steady',
  distributing: 'Selling',
};

export function WhaleBehavior() {
  return (
    <div className="section-block space-y-4">
      <div>
        <h2 className="text-sm font-semibold uppercase tracking-widest text-[var(--fg-muted)]">Big Wallet Activity</h2>
        <p className="text-xs text-[var(--fg-muted)] mt-1">What the top 20 largest holders are doing — are whales buying, holding, or dumping?</p>
      </div>

      <div>
        <div className="text-xs text-[var(--fg-muted)] mb-2">Top 20 Wallets Breakdown</div>
        <div className="flex h-6 rounded-full overflow-hidden">
          {WHALE_DATA.map(w => (
            <div
              key={w.category}
              className={`${CATEGORY_COLORS[w.category]} transition-all`}
              style={{ width: `${w.percentage}%` }}
              title={`${CATEGORY_LABELS[w.category]}: ${w.percentage}%`}
            />
          ))}
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
          {WHALE_DATA.map(w => (
            <div key={w.category} className="flex items-center gap-1.5 text-xs">
              <div className={`w-2 h-2 rounded-full ${CATEGORY_COLORS[w.category]}`} />
              <span className="text-[var(--fg-muted)]">{CATEGORY_LABELS[w.category]}</span>
              <span className="font-medium">{w.percentage}%</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[var(--border)]">
        <div>
          <div className="text-xs text-[var(--fg-muted)]">Net Whale Money Flow</div>
          <div className="text-lg font-bold text-green-400">+${(WHALE_NET_FLOW / 1_000_000).toFixed(1)}M</div>
          <div className="text-[10px] text-[var(--fg-muted)]">Whales have added this much since the price peak</div>
        </div>
        <div>
          <div className="text-xs text-[var(--fg-muted)]">Top 10 Own</div>
          <div className="text-lg font-bold">{WHALE_TOP10_CONCENTRATION}%</div>
          <div className="text-[10px] text-[var(--fg-muted)]">of total supply held by 10 biggest wallets</div>
        </div>
      </div>

      <div className="text-[10px] text-[var(--fg-muted)]">
        Research snapshot from {WHALE_LAST_UPDATED}
      </div>
    </div>
  );
}
