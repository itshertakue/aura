import styles from './TopBar.module.css';

export default function TopBar() {
  return (
    <header className={`${styles.topBar} glass`}>
      <div className={styles.searchContainer}>
        <span className={styles.searchIcon}>🔍</span>
        <input type="text" placeholder="Search suppliers, shipments, or carbon data..." className={styles.searchInput} />
      </div>

      <div className={styles.actions}>
        <div className={styles.budgetIndicator}>
          <div className={styles.budgetLabels}>
            <span>Carbon Budget</span>
            <span className={styles.percent}>64% Used</span>
          </div>
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: '64%' }}></div>
          </div>
        </div>
        
        <button className={styles.profileBtn}>
          <div className={styles.avatar}>T</div>
          <span>Takunda</span>
        </button>
      </div>
    </header>
  );
}
