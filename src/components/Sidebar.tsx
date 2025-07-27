import styles from "./Sidebar.module.css";

interface FileItem {
  name: string;
  type: "file" | "folder";
  children?: FileItem[];
}

interface SidebarProps {
  onFileClick: (fileName: string) => void;
}

const Sidebar = ({ onFileClick }: SidebarProps) => {
  const portfolioFiles: FileItem[] = [
    { name: "about.md", type: "file" },
    {
      name: "projects",
      type: "folder",
      children: [
        { name: "project1.tsx", type: "file" },
        { name: "project2.tsx", type: "file" },
        { name: "project3.tsx", type: "file" },
      ],
    },
    { name: "skills.json", type: "file" },
    { name: "contact.ts", type: "file" },
    { name: "resume.pdf", type: "file" },
  ];

  const renderFileItem = (item: FileItem, depth = 0) => (
    <div
      key={item.name}
      className={styles.fileItem}
      style={{ paddingLeft: `${depth * 16}px` }}
    >
      <div
        className={styles.fileName}
        onClick={() => item.type === "file" && onFileClick(item.name)}
      >
        <span className={styles.fileIcon}>
          {item.type === "folder" ? "📁" : "📄"}
        </span>
        {item.name}
      </div>
      {item.children && (
        <div className={styles.children}>
          {item.children.map((child) => renderFileItem(child, depth + 1))}
        </div>
      )}
    </div>
  );

  return (
    <div className={styles.sidebar}>
      <div className={styles.explorerHeader}>
        <span>EXPLORER</span>
      </div>
      <div className={styles.fileTree}>
        <div className={styles.projectName}>Portfolio</div>
        {portfolioFiles.map((file) => renderFileItem(file))}
      </div>
    </div>
  );
};

export default Sidebar;
