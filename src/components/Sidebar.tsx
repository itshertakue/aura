import styles from './Sidebar.module.css';
import Link from 'next/link';

export default function Sidebar() {
  const menuItems = [
    { name: 'Dashboard', icon: '📊', href: '/' },
    { name: 'Impact Map', icon: '🌍', href: '/map' },
    { name: 'History', icon: '📜', href: '/history' },
    { name: 'AI Auto-Reader', icon: '📄', href: '/upload' },
    { name: 'Climate Copilot', icon: '🤖', href: '/chat' },
    { name: 'Settings', icon: '⚙️', href: '/settings' },
  ];

  return (
    <aside className={`${styles.sidebar} glass`}>
      <div className={styles.logoContainer}>
        <span className={styles.logoIcon}>✨</span>
        <span className="gradient-text h1" style={{ fontSize: '1.5rem' }}>Aura</span>
      </div>
      
      <nav className={styles.nav}>
        {menuItems.map((item) => (
          <Link key={item.name} href={item.href} className={styles.navLink}>
            <span className={styles.icon}>{item.icon}</span>
            <span className={styles.name}>{item.name}</span>
          </Link>
        ))}
      </nav>

      <div className={styles.footer}>
        <div className={styles.statusBadge}>
          <div className={styles.dot}></div>
          <span>Live Emission Feed</span>
        </div>
      </div>
    </aside>
  );
}
