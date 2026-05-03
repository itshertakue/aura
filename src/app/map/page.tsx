'use client';

import { useState } from 'react';
import styles from './page.module.css';

export default function MapPage() {
  const [activeNode, setActiveNode] = useState<any>(null);

  const nodes = [
    { 
      id: 1, 
      name: 'Shenzhen Node', 
      x: 75, y: 45, 
      intensity: 'High', 
      color: 'var(--accent)',
      details: { emissions: '1,240t', status: 'Critical', trend: '+12%' }
    },
    { 
      id: 2, 
      name: 'Berlin Node', 
      x: 52, y: 25, 
      intensity: 'Medium', 
      color: 'var(--primary)',
      details: { emissions: '450t', status: 'Stable', trend: '-2%' }
    },
    { 
      id: 3, 
      name: 'São Paulo Node', 
      x: 30, y: 70, 
      intensity: 'Low', 
      color: 'var(--secondary)',
      details: { emissions: '120t', status: 'Optimal', trend: '-8%' }
    },
    { 
      id: 4, 
      name: 'LA Logistics', 
      x: 15, y: 35, 
      intensity: 'Medium', 
      color: 'var(--primary)',
      details: { emissions: '680t', status: 'Stable', trend: '+1%' }
    },
    { 
      id: 5, 
      name: 'Hanoi Factory', 
      x: 72, y: 55, 
      intensity: 'High', 
      color: 'var(--accent)',
      details: { emissions: '980t', status: 'Review', trend: '+5%' }
    },
  ];

  return (
    <div className={styles.mapPage}>
      <header className={styles.header}>
        <div className={styles.titleGroup}>
          <h2 className="h1">Supply Chain Heatmap</h2>
          <p className={styles.subtitle}>Visualizing carbon intensity across global logistics nodes.</p>
        </div>
        <div className={styles.statsOverview}>
          <div className={styles.miniStat}>
            <span>Active Nodes</span>
            <strong>{nodes.length}</strong>
          </div>
          <div className={styles.miniStat}>
            <span>Critical Hubs</span>
            <strong style={{ color: 'var(--accent)' }}>2</strong>
          </div>
        </div>
      </header>

      <div className={`${styles.mapContainer} glass`}>
        <div className={styles.worldMap}>
          <div className={styles.grid}></div>
          
          {nodes.map(node => (
            <div 
              key={node.id} 
              className={styles.nodeWrapper}
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              onMouseEnter={() => setActiveNode(node)}
              onMouseLeave={() => setActiveNode(null)}
            >
              <div 
                className={styles.node} 
                style={{ '--node-color': node.color } as any}
              >
                <div className={styles.nodePulse}></div>
              </div>

              {activeNode?.id === node.id && (
                <div className={`${styles.tooltip} glass`}>
                  <div className={styles.tooltipHeader}>
                    <strong>{node.name}</strong>
                    <span className={styles.nodeIntensity} style={{ color: node.color }}>{node.intensity}</span>
                  </div>
                  <div className={styles.tooltipBody}>
                    <div className={styles.tStat}>
                      <span>Emissions</span>
                      <strong>{node.details.emissions}</strong>
                    </div>
                    <div className={styles.tStat}>
                      <span>Trend</span>
                      <strong style={{ color: node.details.trend.startsWith('+') ? 'var(--accent)' : 'var(--secondary)' }}>
                        {node.details.trend}
                      </strong>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}

          <svg className={styles.connections}>
            <line x1="75%" y1="45%" x2="52%" y2="25%" className={styles.line} />
            <line x1="52%" y1="25%" x2="15%" y2="35%" className={styles.line} />
            <line x1="30%" y1="70%" x2="15%" y2="35%" className={styles.line} />
            <line x1="75%" y1="45%" x2="72%" y2="55%" className={styles.line} />
          </svg>
        </div>

        <div className={styles.legend}>
          <div className={styles.legendItem}>
            <div className={styles.dot} style={{ background: 'var(--accent)' }}></div>
            <span>High Intensity</span>
          </div>
          <div className={styles.legendItem}>
            <div className={styles.dot} style={{ background: 'var(--primary)' }}></div>
            <span>Standard</span>
          </div>
          <div className={styles.legendItem}>
            <div className={styles.dot} style={{ background: 'var(--secondary)' }}></div>
            <span>Optimal</span>
          </div>
        </div>
      </div>
    </div>
  );
}
