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

  return (
    <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${colors[condition.status]}`}>
      <span className="font-mono text-xs font-bold">{condition.id}</span>
      <div className="flex-1 min-w-0">
        <div className="text-xs font-medium truncate">{condition.label}</div>
        <div className="text-[10px] text-[var(--fg-muted)] truncate">{condition.description}</div>
      </div>
      {condition.live && <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />}
    </div>
  );
}

export function ClassificationEngine({ price, holders }: { price: PriceData | null; holders: HolderData | null }) {
  const nConditions = N_CONDITIONS.map(c => {
    if (c.id === 'N4' && price) {
      return { ...c, status: price.market_cap > 0 ? 'pass' as const : 'fail' as const };
    }
    if (c.id === 'N5' && holders) {
      return { ...c, status: holders.eth_holders > 1000 ? 'pass' as const : 'fail' as const };
    }
    return c;
  });

  const cConditions = C_CONDITIONS.map(c => {
    if (c.id === 'C3' && price) {
      const drawdown = Math.abs(price.ath_change_percentage);
      return {
        ...c,
        status: drawdown > 20 ? 'active' as const : 'pass' as const,
        description: `Current drawdown: ${drawdown.toFixed(0)}% from ATH`,
      };
    }
    return c;
  });

  const allCMet = cConditions.every(c => c.status === 'pass' || c.status === 'active');

  return (
    <div className="section-block space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-[var(--fg-muted)]">Classification Engine</h2>
        {allCMet && (
          <span className="text-xs px-2 py-1 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30">
            Belief Escalation Active
          </span>
        )}
      </div>

      <div>
        <div className="text-xs text-[var(--fg-muted)] mb-2">Coordination-Dominant Conditions (N1-N5)</div>
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
          {nConditions.map(c => <Badge key={c.id} condition={c} />)}
        </div>
      </div>

      <div>
        <div className="text-xs text-[var(--fg-muted)] mb-2">Belief Escalation Conditions (C1-C5)</div>
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
          {cConditions.map(c => <Badge key={c.id} condition={c} />)}
        </div>
      </div>
    </div>
  );
}
