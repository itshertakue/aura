'use client';

import { useState } from 'react';
import styles from './page.module.css';

export default function SettingsPage() {
  const [region, setRegion] = useState('EU - Carbon Border Adjustment');
  const [apiKeyStatus, setApiKeyStatus] = useState('Active');

  return (
    <div className={styles.settingsPage}>
      <header className={styles.header}>
        <h2 className="h1">Global Settings</h2>
        <p className={styles.subtitle}>Configure your organization's carbon intelligence parameters.</p>
      </header>

      <div className={styles.settingsGrid}>
        <section className={`${styles.section} glass`}>
          <h3>Organization Profile</h3>
          <div className={styles.inputGroup}>
            <label>Company Name</label>
            <input type="text" defaultValue="Aura Logistics International" className={styles.input} />
          </div>
          <div className={styles.inputGroup}>
            <label>Industry Vertical</label>
            <select className={styles.input}>
              <option>Supply Chain & Logistics</option>
              <option>Manufacturing</option>
              <option>Energy Generation</option>
              <option>Heavy Industry</option>
            </select>
          </div>
        </section>

        <section className={`${styles.section} glass`}>
          <h3>Compliance & Tax Region</h3>
          <div className={styles.inputGroup}>
            <label>Current Regulation Model</label>
            <select 
              className={styles.input} 
              value={region} 
              onChange={(e) => setRegion(e.target.value)}
            >
              <option>EU - Carbon Border Adjustment (CBAM)</option>
              <option>California - Cap and Trade</option>
              <option>UK - Emissions Trading Scheme</option>
              <option>Global Baseline (Standardized)</option>
            </select>
          </div>
          <div className={styles.regionNote}>
            <span className={styles.infoIcon}>ℹ️</span>
            Your tax savings estimates are currently calculated based on <strong>$85/ton</strong> (current {region} market rate).
          </div>
        </section>

        <section className={`${styles.section} glass`}>
          <h3>AI Intelligence Core</h3>
          <div className={styles.apiStatus}>
            <div className={styles.statusInfo}>
              <label>Gemini AI Status</label>
              <span className={styles.statusBadge} data-status={apiKeyStatus}>
                {apiKeyStatus}
              </span>
            </div>
            <p className={styles.apiDesc}>
              Aura uses Google Gemini 1.5 Flash for autonomous document reading and scenario modeling.
            </p>
          </div>
          <div className={styles.inputGroup}>
            <label>API Configuration</label>
            <div className={styles.keyWrapper}>
              <input type="password" value="••••••••••••••••" readOnly className={styles.input} />
              <button className={styles.verifyBtn}>Re-Verify</button>
            </div>
          </div>
        </section>

        <section className={`${styles.section} glass`}>
          <h3>Notification Webhooks</h3>
          <p className={styles.desc}>Alert your team when high-intensity nodes are detected.</p>
          <button className={styles.secondaryBtn}>Configure Slack/Teams</button>
        </section>
      </div>

      <footer className={styles.footer}>
        <button className={styles.saveBtn}>Save All Changes</button>
      </footer>
    </div>
  );
}
