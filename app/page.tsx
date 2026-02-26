'use client';

import { useSpxData } from '@/lib/hooks';
import { HeroBar } from '@/components/HeroBar';
import { PriceChart } from '@/components/PriceChart';
import { ClassificationEngine } from '@/components/ClassificationEngine';
import { ConvictionGauge } from '@/components/ConvictionGauge';
import { WhaleBehavior } from '@/components/WhaleBehavior';
import { MarketStructure } from '@/components/MarketStructure';
import { VolatilityRisk } from '@/components/VolatilityRisk';
import { SupplyTokenomics } from '@/components/SupplyTokenomics';
import { ScenarioTargets } from '@/components/ScenarioTargets';
import { InvalidationMonitor } from '@/components/InvalidationMonitor';

export default function SpxwindowPage() {
  const { price, holders, liquidity, history, loading, error } = useSpxData();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-[var(--fg-muted)] animate-pulse">Loading dashboard...</div>
      </div>
    );
  }

  if (error && !price) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-red-400 text-sm">Failed to load data. Retrying...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <HeroBar price={price} liquidity={liquidity} />

      <PriceChart history={history} price={price} />

      <ClassificationEngine price={price} holders={holders} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ConvictionGauge holders={holders} />
        <WhaleBehavior />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MarketStructure />
        <VolatilityRisk price={price} />
      </div>

      <SupplyTokenomics liquidity={liquidity} />

      <ScenarioTargets price={price} />

      <InvalidationMonitor holders={holders} liquidity={liquidity} price={price} />
    </div>
  );
}
