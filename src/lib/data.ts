// Clean Data Layer for Demonstration
export interface CarbonRecord {
  id: string;
  title: string;
  category: 'Logistics' | 'Manufacturing' | 'Procurement' | 'Energy';
  amount: number;
  status: 'Verified' | 'Analyzing' | 'Pending';
  timestamp: string;
}

// Start with zero records
export let carbonRecords: CarbonRecord[] = [];

export const addRecord = (record: Omit<CarbonRecord, 'id' | 'timestamp'>) => {
  const newRecord: CarbonRecord = {
    ...record,
    id: Math.random().toString(36).substring(7),
    timestamp: new Date().toISOString()
  };
  carbonRecords = [newRecord, ...carbonRecords];
  return newRecord;
};

export const getStats = () => {
  const total = carbonRecords.reduce((acc, rec) => acc + rec.amount, 0);
  const savings = total * 85; // $85 saved per ton of carbon reduced (simulated tax rate)
  
  // Calculate category distribution
  const categories = ['Logistics', 'Manufacturing', 'Procurement', 'Energy'].map(cat => {
    const catTotal = carbonRecords
      .filter(r => r.category === cat)
      .reduce((acc, r) => acc + r.amount, 0);
    return {
      label: cat,
      percent: total > 0 ? Math.round((catTotal / total) * 100) : 0,
      color: cat === 'Logistics' ? '#0070f3' : cat === 'Manufacturing' ? '#7928ca' : '#00a65a'
    };
  });

  return {
    totalEmissions: total.toFixed(1),
    taxSavings: savings.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
    complianceScore: total > 0 ? 92 : 0, // Score improves with data
    recordCount: carbonRecords.length,
    categories: categories.filter(c => c.percent > 0).length > 0 ? categories : [
      { label: 'Waiting for data...', percent: 0, color: '#eee' }
    ],
    recent: carbonRecords.slice(0, 5).map(r => ({
      id: r.id,
      title: r.title,
      status: r.status,
      carbon: `${r.amount}t`,
      time: 'Just now'
    }))
  };
};

