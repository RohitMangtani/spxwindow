'use client';

import { useState, useMemo } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import type { HistoryPoint, PriceData } from '@/lib/types';

interface PriceChartProps {
  history: HistoryPoint[];
  price: PriceData | null;
}

type Range = '7d' | '30d' | '90d';

function formatDate(dateStr: string, range: Range): string {
  const d = new Date(dateStr);
  if (range === '7d') return d.toLocaleDateString('en-US', { weekday: 'short' });
  if (range === '30d') return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function CustomTooltip({ active, payload }: { active?: boolean; payload?: Array<{ value: number; payload: { date: string } }> }) {
  if (!active || !payload?.length) return null;
  const point = payload[0];
  const d = new Date(point.payload.date);
  return (
    <div className="rounded-lg border border-[var(--surface-border)] bg-[var(--surface)] px-3 py-2 shadow-lg">
      <div className="text-[10px] text-[var(--fg-muted)]">
        {d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
      </div>
      <div className="text-sm font-bold">
        ${point.value < 1 ? point.value.toFixed(4) : point.value.toFixed(2)}
      </div>
    </div>
  );
}

export function PriceChart({ history, price }: PriceChartProps) {
  const [range, setRange] = useState<Range>('90d');

  const filteredData = useMemo(() => {
    if (!history.length) return [];
    const now = new Date();
    const daysMap: Record<Range, number> = { '7d': 7, '30d': 30, '90d': 90 };
    const cutoff = new Date(now.getTime() - daysMap[range] * 86_400_000);
    return history
      .filter((p) => new Date(p.date) >= cutoff)
      .map((p) => ({ ...p, formattedDate: formatDate(p.date, range) }));
  }, [history, range]);

  const { min, max, avg } = useMemo(() => {
    if (!filteredData.length) return { min: 0, max: 0, avg: 0 };
    const prices = filteredData.map((p) => p.price);
    return {
      min: Math.min(...prices),
      max: Math.max(...prices),
      avg: prices.reduce((a, b) => a + b, 0) / prices.length,
    };
  }, [filteredData]);

  const rangeChange = useMemo(() => {
    if (filteredData.length < 2) return 0;
    const first = filteredData[0].price;
    const last = filteredData[filteredData.length - 1].price;
    return ((last - first) / first) * 100;
  }, [filteredData]);

  const isPositive = rangeChange >= 0;
  const chartColor = isPositive ? '#22c55e' : '#ef4444';

  if (!history.length) return null;

  return (
    <div className="section-block space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-widest text-[var(--fg-muted)]">
            Price History
          </h2>
          <div className="flex items-baseline gap-3 mt-1">
            <span className={`text-sm font-medium ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
              {isPositive ? '+' : ''}{rangeChange.toFixed(1)}%
            </span>
            <span className="text-xs text-[var(--fg-muted)]">
              over {range === '7d' ? '7 days' : range === '30d' ? '30 days' : '90 days'}
            </span>
          </div>
        </div>
        <div className="flex gap-1 rounded-lg border border-[var(--surface-border)] p-0.5">
          {(['7d', '30d', '90d'] as Range[]).map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`px-3 py-1 rounded-md text-xs font-medium cursor-pointer transition-all ${
                range === r
                  ? 'bg-[var(--fg)] text-[var(--bg)]'
                  : 'text-[var(--fg-muted)] hover:text-[var(--fg)]'
              }`}
            >
              {r.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="h-[280px] -ml-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={filteredData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={chartColor} stopOpacity={0.25} />
                <stop offset="100%" stopColor={chartColor} stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="formattedDate"
              tick={{ fill: '#9ca3af', fontSize: 10 }}
              axisLine={false}
              tickLine={false}
              interval="preserveStartEnd"
              minTickGap={40}
            />
            <YAxis
              domain={[min * 0.95, max * 1.05]}
              tick={{ fill: '#9ca3af', fontSize: 10 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v: number) => `$${v < 1 ? v.toFixed(2) : v.toFixed(0)}`}
              width={50}
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine
              y={avg}
              stroke="#9ca3af"
              strokeDasharray="3 3"
              strokeOpacity={0.3}
            />
            <Area
              type="monotone"
              dataKey="price"
              stroke={chartColor}
              strokeWidth={2}
              fill="url(#priceGradient)"
              dot={false}
              activeDot={{
                r: 4,
                fill: chartColor,
                stroke: '#18181b',
                strokeWidth: 2,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4 pt-3 border-t border-[var(--border)]">
        <div>
          <div className="text-xs text-[var(--fg-muted)]">Period Low</div>
          <div className="text-sm font-medium text-red-400">
            ${min < 1 ? min.toFixed(4) : min.toFixed(2)}
          </div>
        </div>
        <div className="text-center">
          <div className="text-xs text-[var(--fg-muted)]">Average</div>
          <div className="text-sm font-medium">
            ${avg < 1 ? avg.toFixed(4) : avg.toFixed(2)}
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs text-[var(--fg-muted)]">Period High</div>
          <div className="text-sm font-medium text-green-400">
            ${max < 1 ? max.toFixed(4) : max.toFixed(2)}
          </div>
        </div>
      </div>

      {price && (
        <div className="text-[10px] text-[var(--fg-muted)] text-right">
          Live: ${price.price < 1 ? price.price.toFixed(4) : price.price.toFixed(2)} · Updated {new Date(price.last_updated).toLocaleTimeString()}
        </div>
      )}
    </div>
  );
}
