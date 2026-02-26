import { NextResponse } from 'next/server';
import { fetchCoinGeckoPrice } from '@/lib/api-clients';

export async function GET() {
  try {
    const data = await fetchCoinGeckoPrice();
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'Failed to fetch price' },
      { status: 502 }
    );
  }
}
