'use client';

import { CORRELATION_DATA } from '@/lib/static-data';

function StatRow({ label, value, explanation }: { label: string; value: string; explanation?: string }) {
  return (
    <div className="py-2 border-b border-[var(--border)] last:border-0">
      <div className="flex items-center justify-between">
        <span className="text-xs text-[var(--fg-muted)]">{label}</span>
        <span className="text-sm font-medium">{value}</span>
      </div>
      {explanation && <div className="text-[10px] text-[var(--fg-muted)] mt-0.5">{explanation}</div>}
    </div>
  );
}

function getCorrelationLabel(val: number): string {
  if (val >= 0.8) return 'Moves very closely with';
  if (val >= 0.6) return 'Moves fairly closely with';
  if (val >= 0.4) return 'Somewhat follows';
  return 'Loosely related to';
}

export function MarketStructure() {
  const d = CORRELATION_DATA;
  const asymmetry = d.downside_capture - d.upside_capture;
  const asymmetryWarning = asymmetry > 0;

  return (
    <div className="section-block space-y-4">
      <div>
        <h2 className="text-sm font-semibold uppercase tracking-widest text-[var(--fg-muted)]">How SPX Moves With The Market</h2>
        <p className="text-xs text-[var(--fg-muted)] mt-1">Does SPX follow ETH and BTC, or move independently? How amplified are the swings?</p>
      </div>

      <div>
        <StatRow
          label="Correlation with ETH"
          value={d.eth_correlation.toFixed(2)}
          explanation={`${getCorrelationLabel(d.eth_correlation)} Ethereum (1.0 = identical, 0 = no relation)`}
        />
        <StatRow
          label="Correlation with BTC"
          value={d.btc_correlation.toFixed(2)}
          explanation={`${getCorrelationLabel(d.btc_correlation)} Bitcoin`}
        />
        <StatRow
          label="Amplification vs ETH"
          value={`${d.beta_eth.toFixed(1)}x`}
          explanation={`When ETH moves 1%, SPX tends to move ${d.beta_eth.toFixed(1)}%`}
        />
        <StatRow
          label="Amplification vs BTC"
          value={`${d.beta_btc.toFixed(1)}x`}
          explanation={`When BTC moves 1%, SPX tends to move ${d.beta_btc.toFixed(1)}%`}
        />
        <StatRow
          label="Upside Amplification"
          value={`${d.upside_capture.toFixed(1)}x`}
          explanation="How much SPX gains when the market goes up"
        />
        <StatRow
          label="Downside Amplification"
          value={`${d.downside_capture.toFixed(1)}x`}
          explanation="How much SPX drops when the market goes down"
        />
      </div>

      {asymmetryWarning && (
        <div className="text-xs px-3 py-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
          Heads up: SPX tends to fall harder ({d.downside_capture.toFixed(1)}x) than it rises ({d.upside_capture.toFixed(1)}x) relative to the market.
        </div>
      )}

      <div className="text-[10px] text-[var(--fg-muted)]">
        Research snapshot from {d.last_updated}
      </div>
    </div>
  );
}
