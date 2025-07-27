import {
  VscFolder,
  VscFolderOpened,
  VscFile,
  VscFileCode,
  VscJson,
  VscMarkdown,
} from "react-icons/vsc";
import styles from "./Sidebar.module.css";

interface FileItem {
  name: string;
  type: "file" | "folder";
  children?: FileItem[];
}

interface SidebarProps {
  onFileClick: (fileName: string) => void;
  expandedFolders: Set<string>;
  setExpandedFolders: React.Dispatch<React.SetStateAction<Set<string>>>;
}

const Sidebar = ({
  onFileClick,
  expandedFolders,
  setExpandedFolders,
}: SidebarProps) => {
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

  const toggleFolder = (folderName: string) => {
    setExpandedFolders((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(folderName)) {
        newSet.delete(folderName);
      } else {
        newSet.add(folderName);
      }
      return newSet;
    });
  };

  const getFileIcon = (
    fileName: string,
    isFolder: boolean,
    isExpanded?: boolean
  ) => {
    if (isFolder) {
      return isExpanded ? <VscFolderOpened /> : <VscFolder />;
    }

    const extension = fileName.split(".").pop()?.toLowerCase();
    switch (extension) {
      case "md":
        return <VscMarkdown />;
      case "json":
        return <VscJson />;
      case "ts":
      case "tsx":
      case "js":
      case "jsx":
        return <VscFileCode />;
      default:
        return <VscFile />;
    }
  };

  const renderFileItem = (item: FileItem, depth = 0) => {
    const isExpanded = expandedFolders.has(item.name);

    return (
      <div
        key={item.name}
        className={styles.fileItem}
        style={{ paddingLeft: `${depth * 16}px` }}
      >
        <div
          className={styles.fileName}
          onClick={() => {
            if (item.type === "file") {
              onFileClick(item.name);
            } else {
              toggleFolder(item.name);
            }
          }}
        >
          {item.type === "folder" ? (
            <span
              className={`${styles.chevron} ${
                isExpanded ? styles.expanded : styles.collapsed
              }`}
            >
              ▶
            </span>
          ) : (
            <span className={styles.chevronSpacer}></span>
          )}
          <div className={styles.fileIcon}>
            {getFileIcon(item.name, item.type === "folder", isExpanded)}
          </div>
          {item.name}
        </div>
        {item.children && isExpanded && (
          <div
            className={`${styles.children} ${
              isExpanded ? styles.expanded : styles.collapsed
            }`}
          >
            {item.children.map((child) => renderFileItem(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

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
