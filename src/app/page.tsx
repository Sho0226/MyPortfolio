import Sidebar from '@/components/Sidebar';
import MainEditor from '@/components/MainEditor';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.vscodeLayout}>
      <Sidebar />
      <MainEditor />
    </div>
  );
}
