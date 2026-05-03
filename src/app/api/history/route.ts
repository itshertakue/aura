import { NextResponse } from 'next/server';
import { carbonRecords } from '@/lib/data';

export async function GET() {
  return NextResponse.json(carbonRecords);
}
