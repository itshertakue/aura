import { NextResponse } from 'next/server';
import { getStats } from '@/lib/data';

export async function GET() {
  const stats = getStats();

  return NextResponse.json({
    metrics: [
      { label: 'Total Emissions', value: stats.totalEmissions, unit: 'MT CO2e', trend: '---', color: '#0070f3' },
      { label: 'Tax Savings', value: stats.taxSavings, unit: '', trend: '---', color: '#00a65a' },
      { label: 'Compliance', value: stats.complianceScore + '%', unit: 'Score', trend: '---', color: '#7928ca' },
    ],
    categories: stats.categories,
    recentActivity: stats.recent
  });
}
