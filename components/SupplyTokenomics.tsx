'use client';

import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { MAX_SUPPLY, CIRCULATING_SUPPLY, BURNED_SUPPLY, LP_LOCK_YEARS, BUY_SELL_TAX } from '@/lib/static-data';
import type { LiquidityData } from '@/lib/types';

const SUPPLY_DATA = [
  { name: 'Circulating', value: CIRCULATING_SUPPLY, color: '#3b82f6' },
  { name: 'Burned', value: BURNED_SUPPLY, color: '#ef4444' },
];

function TrustBadge({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-green-500/10 border border-green-500/20">
      <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
      <div>
        <div className="text-xs font-medium text-green-400">{value}</div>
        <div className="text-[10px] text-[var(--fg-muted)]">{label}</div>
      </div>
    </div>
  );
}

export function SupplyTokenomics({ liquidity }: { liquidity: LiquidityData | null }) {
  return (
    <div className="section-block space-y-4">
      <h2 className="text-sm font-semibold uppercase tracking-widest text-[var(--fg-muted)]">Supply & Tokenomics</h2>

      <div className="flex flex-col sm:flex-row items-center gap-6">
        <div className="w-32 h-32">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={SUPPLY_DATA} dataKey="value" innerRadius={35} outerRadius={55} strokeWidth={0}>
                {SUPPLY_DATA.map(entry => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="flex-1 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
              <span className="text-xs text-[var(--fg-muted)]">Circulating</span>
            </div>
            <span className="text-xs font-medium">
              {(CIRCULATING_SUPPLY / 1e6).toFixed(0)}M ({((CIRCULATING_SUPPLY / MAX_SUPPLY) * 100).toFixed(1)}%)
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
              <span className="text-xs text-[var(--fg-muted)]">Burned</span>
            </div>
            <span className="text-xs font-medium">
              {(BURNED_SUPPLY / 1e6).toFixed(0)}M ({((BURNED_SUPPLY / MAX_SUPPLY) * 100).toFixed(1)}%)
            </span>
          </div>
          {liquidity && (
            <>
              <div className="flex items-center justify-between pt-2 border-t border-[var(--border)]">
                <span className="text-xs text-[var(--fg-muted)]">DEX Liquidity</span>
                <span className="text-xs font-medium">${(liquidity.dex_liquidity_usd / 1e6).toFixed(2)}M</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-[var(--fg-muted)]">DEX Volume (24h)</span>
                <span className="text-xs font-medium">${(liquidity.volume_24h / 1e6).toFixed(2)}M</span>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-[var(--border)]">
        <TrustBadge label="LP Lock" value={`${LP_LOCK_YEARS} Years`} />
        <TrustBadge label="Buy/Sell Tax" value={`${BUY_SELL_TAX}%`} />
        <TrustBadge label="Contract" value="Renounced" />
        <TrustBadge label="Mint Authority" value="Renounced" />
      </div>
    </div>
  );
}
