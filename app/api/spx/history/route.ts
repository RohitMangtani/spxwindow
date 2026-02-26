import { NextRequest, NextResponse } from 'next/server';
import { fetchCoinGeckoHistory } from '@/lib/api-clients';

export async function GET(request: NextRequest) {
  const days = parseInt(request.nextUrl.searchParams.get('days') || '90', 10);
  try {
    const data = await fetchCoinGeckoHistory(Math.min(days, 365));
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'Failed to fetch history' },
      { status: 502 }
    );
  }
}
