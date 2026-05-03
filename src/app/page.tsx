'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.css';
import Optimizer from '@/components/Optimizer';

export default function Home() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch('/api/stats');
        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error('Failed to fetch stats');
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  if (loading) return <div className={styles.loading}>Initializing Intelligence Feed...</div>;

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <h2 className="h1">Operational Overview</h2>
        <p className={styles.subtitle}>Real-time carbon intelligence across your global supply nodes.</p>
      </header>

      <div className={styles.metricsGrid}>
        {stats?.metrics.map((metric: any) => (
          <div key={metric.label} className={`${styles.metricCard} glass`}>
            <span className={styles.metricLabel}>{metric.label}</span>
            <div className={styles.metricValueWrapper}>
              <span className={styles.metricValue} style={{ color: metric.color }}>{metric.value}</span>
              <span className={styles.metricUnit}>{metric.unit}</span>
            </div>
            <div className={styles.metricFooter}>
              <span className={styles.trend} data-positive={metric.trend.startsWith('-')}>{metric.trend}</span>
              <span className={styles.vsLast}>vs last month</span>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.mainGrid}>
        <section className={`${styles.chartSection} glass`}>
          <div className={styles.sectionHeader}>
            <h3>Emission Intensity by Category</h3>
          </div>
          <div className={styles.placeholderChart}>
            {stats?.categories.map((cat: any) => (
              <div key={cat.label} className={styles.barGroup}>
                <div className={styles.barLabel}>
                  <span>{cat.label}</span>
                  <span>{cat.percent}%</span>
                </div>
                <div className={styles.barBg}>
                  <div className={styles.barFill} style={{ width: `${cat.percent}%`, background: cat.color }}></div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className={`${styles.recentSection} glass`}>
          <div className={styles.sectionHeader}>
            <h3>AI Auto-Reader Detections</h3>
          </div>
          <div className={styles.activityList}>
            {stats?.recentActivity.map((item: any) => (
              <div key={item.id} className={styles.activityItem}>
                <div className={styles.itemInfo}>
                  <span className={styles.itemTitle}>{item.title}</span>
                  <span className={styles.itemTime}>{item.time}</span>
                </div>
                <div className={styles.itemMeta}>
                  <span className={styles.itemCarbon}>{item.carbon}</span>
                  <span className={styles.itemStatus} data-status={item.status}>{item.status}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <Optimizer />
    </div>
  );
}
