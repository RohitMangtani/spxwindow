'use client';

import { N_CONDITIONS, C_CONDITIONS } from '@/lib/static-data';
import type { PriceData, HolderData, Condition } from '@/lib/types';

function Badge({ condition }: { condition: Condition }) {
  const colors: Record<string, string> = {
    pass: 'bg-green-500/15 text-green-400 border-green-500/30',
    fail: 'bg-red-500/15 text-red-400 border-red-500/30',
    active: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
    warning: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30',
  };

  const statusLabel: Record<string, string> = {
    pass: 'Yes',
    fail: 'No',
    active: 'Active',
    warning: 'Watch',
  };

  return (
    <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${colors[condition.status]}`}>
      <div className="flex-1 min-w-0">
        <div className="text-xs font-medium truncate">{condition.label}</div>
        <div className="text-[10px] text-[var(--fg-muted)] truncate">{condition.description}</div>
      </div>
      <div className="flex items-center gap-1.5 shrink-0">
        <span className="text-[10px] font-medium">{statusLabel[condition.status]}</span>
        {condition.live && <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" title="Updates live" />}
      </div>
    </div>
  );
}

export function ClassificationEngine({ price, holders }: { price: PriceData | null; holders: HolderData | null }) {
  const nConditions = N_CONDITIONS.map(c => {
    if (c.id === 'N4' && price) {
      return { ...c, status: price.market_cap > 0 ? 'pass' as const : 'fail' as const };
    }
    if (c.id === 'N5' && holders) {
      return { ...c, status: (holders.eth_holders ?? 0) > 1000 ? 'pass' as const : 'fail' as const };
    }
    return c;
  });

  const cConditions = C_CONDITIONS.map(c => {
    if (c.id === 'C3' && price) {
      const drawdown = Math.abs(price.ath_change_percentage);
      return {
        ...c,
        status: drawdown > 20 ? 'active' as const : 'pass' as const,
        description: `Current drawdown: ${drawdown.toFixed(0)}% from all-time high`,
      };
    }
    return c;
  });

  const allCMet = cConditions.every(c => c.status === 'pass' || c.status === 'active');

  return (
    <div className="section-block space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-widest text-[var(--fg-muted)]">What Makes SPX6900 Unique</h2>
          <p className="text-xs text-[var(--fg-muted)] mt-1">SPX has no utility, no revenue, no backing — its value comes entirely from community belief. These checks verify that.</p>
        </div>
        {allCMet && (
          <span className="text-xs px-2 py-1 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30 shrink-0 ml-3">
            Belief Escalation Active
          </span>
        )}
      </div>

      <div>
        <div className="text-xs font-medium text-[var(--fg)] mb-2">Is it a pure belief-driven token?</div>
        <p className="text-[10px] text-[var(--fg-muted)] mb-2">All 5 must be &quot;Yes&quot; — meaning value comes from collective belief, not fundamentals</p>
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
          {nConditions.map(c => <Badge key={c.id} condition={c} />)}
        </div>
      </div>

      <div>
        <div className="text-xs font-medium text-[var(--fg)] mb-2">Is the community strong enough to sustain it?</div>
        <p className="text-[10px] text-[var(--fg-muted)] mb-2">These show whether the community has the staying power to keep the belief alive</p>
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
          {cConditions.map(c => <Badge key={c.id} condition={c} />)}
        </div>
      </div>
    </div>
  );
}
