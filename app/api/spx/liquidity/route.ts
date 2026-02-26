import { NextResponse } from 'next/server';
import { fetchDexScreenerLiquidity } from '@/lib/api-clients';

export async function GET() {
  try {
    const data = await fetchDexScreenerLiquidity();
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'Failed to fetch liquidity' },
      { status: 502 }
    );
  }
}
