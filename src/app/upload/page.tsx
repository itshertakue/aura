'use client';

import { useState } from 'react';
import styles from './page.module.css';

export default function UploadPage() {
  const [isUploading, setIsUploading] = useState(false);
  const [activeScans, setActiveScans] = useState<any[]>([]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    
    // Create a temporary scan item
    const tempId = Math.random().toString(36).substring(7);
    const newScan = {
      id: tempId,
      fileName: file.name,
      fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      progress: 10,
      status: 'Analyzing Scopes...'
    };
    
    setActiveScans(prev => [newScan, ...prev]);

    // Simulate progress
    const interval = setInterval(() => {
      setActiveScans(prev => prev.map(s => 
        s.id === tempId ? { ...s, progress: Math.min(s.progress + 15, 95) } : s
      ));
    }, 500);

    // Call real API
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/carbon/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      
      clearInterval(interval);
      setActiveScans(prev => prev.map(s => 
        s.id === tempId ? { ...s, progress: 100, status: 'Verified', carbon: `${data.carbonAmount}t` } : s
      ));
    } catch (err) {
      console.error('Upload failed');
      clearInterval(interval);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className={styles.uploadPage}>
      <header className={styles.header}>
        <h2 className="h1">AI Auto-Reader</h2>
        <p className={styles.subtitle}>Upload your invoices to extract carbon data instantly.</p>
      </header>

      <label className={`${styles.dropZone} glass glow-primary`}>
        <input type="file" hidden onChange={handleFileUpload} disabled={isUploading} />
        <div className={styles.uploadIcon}>📄</div>
        <h3>{isUploading ? 'Analyzing Document...' : 'Drop files here or click to upload'}</h3>
        <p>Supports PDF, JPEG, and Excel</p>
      </label>

      <div className={styles.processingSection}>
        <div className={styles.sectionHeader}>
          <h3>Current Session Activity</h3>
          <span className={styles.scanningCount}>{activeScans.length} files detected</span>
        </div>

        <div className={styles.scanList}>
          {activeScans.map(scan => (
            <div key={scan.id} className={`${styles.scanCard} glass`}>
              <div className={styles.scanInfo}>
                <div className={styles.fileIcon}>📄</div>
                <div className={styles.fileDetails}>
                  <span className={styles.fileName}>{scan.fileName}</span>
                  <span className={styles.fileSize}>{scan.fileSize} • {scan.status}</span>
                </div>
              </div>
              <div className={styles.scanProgress}>
                {scan.carbon && <span className={styles.scanCarbon}>{scan.carbon}</span>}
                <div className={styles.progressLine}>
                  <div className={styles.progressFill} style={{ width: `${scan.progress}%` }}></div>
                </div>
                <span className={styles.progressPercent}>{scan.progress}%</span>
              </div>
            </div>
          ))}
          {activeScans.length === 0 && (
            <div className={styles.emptyState}>No documents uploaded in this session.</div>
          )}
        </div>
      </div>
    </div>
  );
}
