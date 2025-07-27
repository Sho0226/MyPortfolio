import styles from './TabBar.module.css';

interface Tab {
  id: string;
  name: string;
  active?: boolean;
}

interface TabBarProps {
  tabs: Tab[];
  activeTab: string;
  onTabClick: (tabId: string) => void;
  onTabClose: (tabId: string) => void;
}

const TabBar = ({ tabs, activeTab, onTabClick, onTabClose }: TabBarProps) => {
  return (
    <div className={styles.tabBar}>
      {tabs.map((tab) => (
        <div
          key={tab.id}
          className={`${styles.tab} ${tab.id === activeTab ? styles.active : ''}`}
          onClick={() => onTabClick(tab.id)}
        >
          <span className={styles.tabName}>{tab.name}</span>
          <button
            className={styles.closeButton}
            onClick={(e) => {
              e.stopPropagation();
              onTabClose(tab.id);
            }}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
};

export default TabBar;