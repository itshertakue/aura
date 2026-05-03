'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.css';

export default function HistoryPage() {
  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    async function fetchHistory() {
      try {
        const res = await fetch('/api/history');
        const data = await res.json();
        setRecords(data);
      } catch (err) {
        console.error('Failed to fetch history');
      } finally {
        setLoading(false);
      }
    }
    fetchHistory();
  }, []);

  const filteredRecords = filter === 'All' 
    ? records 
    : records.filter(r => r.category === filter);

  if (loading) return <div className={styles.loading}>Loading audit trails...</div>;

  return (
    <div className={styles.historyPage}>
      <header className={styles.header}>
        <div className={styles.titleGroup}>
          <h2 className="h1">Emission History</h2>
          <p className={styles.subtitle}>Audit trail of all AI-extracted carbon detections.</p>
        </div>
        <div className={styles.filters}>
          {['All', 'Logistics', 'Manufacturing', 'Procurement', 'Energy'].map(cat => (
            <button 
              key={cat} 
              className={`${styles.filterBtn} ${filter === cat ? styles.active : ''} glass`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      <div className={`${styles.tableContainer} glass`}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Document</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.map((record) => (
              <tr key={record.id} className={styles.row}>
                <td className={styles.titleCell}>
                  <span className={styles.fileIcon}>📄</span>
                  {record.title}
                </td>
                <td>
                  <span className={styles.categoryTag} data-category={record.category}>
                    {record.category}
                  </span>
                </td>
                <td className={styles.amount}>
                  <strong>{record.amount}t</strong> CO2e
                </td>
                <td>
                  <span className={styles.status} data-status={record.status}>
                    {record.status}
                  </span>
                </td>
                <td className={styles.time}>
                  {new Date(record.timestamp).toLocaleString()}
                </td>
              </tr>
            ))}
            {filteredRecords.length === 0 && (
              <tr>
                <td colSpan={5} className={styles.empty}>
                  No records found for this category.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
