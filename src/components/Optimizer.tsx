'use client';

import { useState, useEffect } from 'react';
import styles from './Optimizer.module.css';

export default function Optimizer() {
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This would be triggered by analyzing the live data layer
    setTimeout(() => {
      setRecommendations([
        {
          id: 'opt1',
          title: 'Shift Logistics to Rail',
          description: 'Switching your 14.2t Berlin-Poznan route from truck to rail.',
          carbonSaving: '3.4t',
          costImpact: '-$1,200 (Tax)',
          difficulty: 'Low',
          icon: '🚄'
        },
        {
          id: 'opt2',
          title: 'Solar Vendor Swap',
          description: 'Your current steel vendor uses coal. Switch to "GreenSteel Hanoi".',
          carbonSaving: '8.1t',
          costImpact: '-$4,400 (Tax)',
          difficulty: 'Medium',
          icon: '☀️'
        }
      ]);
      setLoading(false);
    }, 2000);
  }, []);

  if (loading) return <div className={styles.loading}>AI Scanning for optimizations...</div>;

  return (
    <div className={`${styles.optimizer} glass glow-secondary`}>
      <div className={styles.header}>
        <div className={styles.headerTitle}>
          <span className={styles.aiBadge}>AI RECOMMENDATIONS</span>
          <h3>Live Supply Chain Optimization</h3>
        </div>
        <div className={styles.totalImpact}>
          <span>Potential Savings:</span>
          <strong>$5,600</strong>
        </div>
      </div>

      <div className={styles.recommendationList}>
        {recommendations.map(rec => (
          <div key={rec.id} className={styles.recCard}>
            <div className={styles.recHeader}>
              <span className={styles.recIcon}>{rec.icon}</span>
              <div className={styles.recTitleGroup}>
                <span className={styles.recTitle}>{rec.title}</span>
                <span className={styles.recDesc}>{rec.description}</span>
              </div>
            </div>
            <div className={styles.recStats}>
              <div className={styles.recStat}>
                <span className={styles.statLabel}>CO2 Saved</span>
                <span className={styles.statValue} style={{ color: 'var(--secondary)' }}>{rec.carbonSaving}</span>
              </div>
              <div className={styles.recStat}>
                <span className={styles.statLabel}>Tax Impact</span>
                <span className={styles.statValue} style={{ color: 'var(--primary)' }}>{rec.costImpact}</span>
              </div>
              <button className={styles.applyBtn}>Execute Shift</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
