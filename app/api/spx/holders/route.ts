import { NextResponse } from 'next/server';
import { fetchEtherscanHolders, fetchBasescanHolders } from '@/lib/api-clients';

export async function GET() {
  try {
    const [eth, base] = await Promise.all([
      fetchEtherscanHolders(),
      fetchBasescanHolders(),
    ]);
    return NextResponse.json({
      eth_holders: eth,
      base_holders: base,
      total_estimated: eth + base,
      last_updated: new Date().toISOString(),
    });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'Failed to fetch holders' },
      { status: 502 }
    );
  }
}
