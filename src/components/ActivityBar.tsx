import {
  VscFiles,
  VscSearch,
  VscSourceControl,
  VscExtensions,
  VscSettingsGear,
} from "react-icons/vsc";
import styles from "./ActivityBar.module.css";

interface ActivityBarProps {
  activeActivity: string;
  onActivityChange: (activity: string) => void;
}

const ActivityBar = ({
  activeActivity,
  onActivityChange,
}: ActivityBarProps) => {
  const activities = [
    {
      id: "explorer",
      icon: <VscFiles />,
      label: "Explorer",
    },
    {
      id: "search",
      icon: <VscSearch />,
      label: "Search",
    },
    {
      id: "source-control",
      icon: <VscSourceControl />,
      label: "Source Control",
    },
    {
      id: "extensions",
      icon: <VscExtensions />,
      label: "Extensions",
    },
  ];

  return (
    <div className={styles.activityBar}>
      <div className={styles.activityList}>
        {activities.map((activity) => (
          <div
            key={activity.id}
            className={`${styles.activityItem} ${
              activeActivity === activity.id ? styles.active : ""
            }`}
            onClick={() => onActivityChange(activity.id)}
            title={activity.label}
          >
            <div className={styles.activityIcon}>{activity.icon}</div>
          </div>
        ))}
      </div>
      <div className={styles.bottomActions}>
        <div className={styles.activityItem} title="Settings">
          <div className={styles.activityIcon}>
            <VscSettingsGear />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityBar;
