'use client';

import { CORRELATION_DATA } from '@/lib/static-data';

function StatRow({ label, value, subtext }: { label: string; value: string; subtext?: string }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-[var(--border)] last:border-0">
      <span className="text-xs text-[var(--fg-muted)]">{label}</span>
      <div className="text-right">
        <span className="text-sm font-medium">{value}</span>
        {subtext && <span className="text-xs text-[var(--fg-muted)] ml-1">{subtext}</span>}
      </div>
    </div>
  );
}

export function MarketStructure() {
  const d = CORRELATION_DATA;
  const asymmetry = d.downside_capture - d.upside_capture;
  const asymmetryWarning = asymmetry > 0;

  return (
    <div className="section-block space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-[var(--fg-muted)]">Market Structure</h2>
        <span className="text-xs text-[var(--fg-muted)]">Updated {d.last_updated}</span>
      </div>

      <div>
        <StatRow label="ETH Correlation" value={d.eth_correlation.toFixed(3)} subtext="(strong)" />
        <StatRow label="BTC Correlation" value={d.btc_correlation.toFixed(3)} />
        <StatRow label="Beta to ETH" value={`${d.beta_eth.toFixed(2)}x`} />
        <StatRow label="Beta to BTC" value={`${d.beta_btc.toFixed(2)}x`} />
        <StatRow label="Upside Capture" value={`${d.upside_capture.toFixed(2)}x`} />
        <StatRow label="Downside Capture" value={`${d.downside_capture.toFixed(2)}x`} />
      </div>

      {asymmetryWarning && (
        <div className="text-xs px-3 py-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
          Asymmetry Warning: Downside capture exceeds upside by {asymmetry.toFixed(2)}x
        </div>
      )}
    </div>
  );
}
