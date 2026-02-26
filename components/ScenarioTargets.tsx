'use client';

import { SCENARIO_TARGETS, PROBABILITY_SCENARIOS, PEER_COMPARISONS } from '@/lib/static-data';
import type { PriceData } from '@/lib/types';

function fmt(n: number): string {
  if (n >= 1e9) return `$${(n / 1e9).toFixed(1)}B`;
  if (n >= 1e6) return `$${(n / 1e6).toFixed(0)}M`;
  return `$${n.toLocaleString()}`;
}

export function ScenarioTargets({ price }: { price: PriceData | null }) {
  const currentMcap = price?.market_cap ?? 620_000_000;
  const currentPrice = price?.price ?? 0.67;

  return (
    <div className="section-block space-y-6">
      <div>
        <h2 className="text-sm font-semibold uppercase tracking-widest text-[var(--fg-muted)]">What If Scenarios</h2>
        <p className="text-xs text-[var(--fg-muted)] mt-1">What would SPX be worth if it reached the market cap of other meme coins?</p>
      </div>

      <div>
        <div className="text-xs text-[var(--fg-muted)] mb-2">
          Price Targets (current price: ${currentPrice < 1 ? currentPrice.toFixed(4) : currentPrice.toFixed(2)})
        </div>
        <div className="space-y-2">
          {SCENARIO_TARGETS.map(t => {
            const multiple = t.market_cap / currentMcap;
            return (
              <div key={t.label} className="flex items-center justify-between py-1.5 border-b border-[var(--border)] last:border-0">
                <span className="text-xs">{t.label}</span>
                <div className="flex items-center gap-4">
                  <span className="text-xs text-[var(--fg-muted)]">{fmt(t.market_cap)} mcap</span>
                  <span className="text-xs font-medium text-green-400">{multiple.toFixed(1)}x your money</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <div className="text-xs text-[var(--fg-muted)] mb-2">How Likely? (Research Estimate)</div>
        <div className="space-y-2">
          {PROBABILITY_SCENARIOS.map(s => (
            <div key={s.label}>
              <div className="flex justify-between text-xs mb-1">
                <span>{s.label}</span>
                <span className="font-medium">{s.probability}%</span>
              </div>
              <div className="h-2 rounded-full bg-[var(--bg-accent)]">
                <div className="h-full rounded-full" style={{ width: `${s.probability}%`, backgroundColor: s.color }} />
              </div>
            </div>
          ))}
        </div>
        <div className="text-[10px] text-[var(--fg-muted)] mt-2">These are subjective estimates, not guarantees. Do your own research.</div>
      </div>

      <div>
        <div className="text-xs text-[var(--fg-muted)] mb-2">How SPX Compares to Other Meme Coins</div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-[var(--fg-muted)] border-b border-[var(--border)]">
                <th className="text-left py-2 font-medium">Token</th>
                <th className="text-right py-2 font-medium">Market Cap</th>
                <th className="text-right py-2 font-medium">Down From Peak</th>
                <th className="text-right py-2 font-medium">1 Year Return</th>
              </tr>
            </thead>
            <tbody>
              {PEER_COMPARISONS.map(p => (
                <tr
                  key={p.ticker}
                  className={`border-b border-[var(--border)] last:border-0 ${p.ticker === 'SPX' ? 'text-blue-400' : ''}`}
                >
                  <td className="py-2 font-medium">{p.name}</td>
                  <td className="text-right py-2">{p.market_cap}</td>
                  <td className="text-right py-2 text-red-400">{p.ath_drawdown}</td>
                  <td className={`text-right py-2 ${p.one_year_return.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                    {p.one_year_return}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
