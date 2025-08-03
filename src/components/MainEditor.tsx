import TabBar from "./TabBar";
import ReactMarkdown from "react-markdown";
import styles from "./MainEditor.module.css";

interface Tab {
  id: string;
  name: string;
  content: string;
  language: string;
}

interface MainEditorProps {
  tabs: Tab[];
  activeTab: string;
  onTabClick: (tabId: string) => void;
  onTabClose: (tabId: string) => void;
}

const MainEditor = ({
  tabs,
  activeTab,
  onTabClick,
  onTabClose,
}: MainEditorProps) => {
  const activeTabContent = tabs.find((tab) => tab.id === activeTab);

  return (
    <div className={styles.mainEditor}>
      <TabBar
        tabs={tabs}
        activeTab={activeTab}
        onTabClick={onTabClick}
        onTabClose={onTabClose}
      />
      <div className={styles.editorArea}>
        {activeTabContent ? (
          <div className={styles.editorContent}>
            <div className={styles.lineNumbers}>
              {activeTabContent.content.split("\n").map((_, index) => (
                <div key={index + 1} className={styles.lineNumber}>
                  {index + 1}
                </div>
              ))}
            </div>
            <div className={styles.codeArea}>
              {activeTabContent.language === "markdown" ? (
                <div className={styles.markdownContent}>
                  <ReactMarkdown
                    components={{
                      a: ({ node, ...props }) => (
                        <a
                          {...props}
                          target="_blank"
                          rel="noopener noreferrer"
                        />
                      ),
                    }}
                  >
                    {activeTabContent.content}
                  </ReactMarkdown>
                </div>
              ) : (
                <pre className={styles.code}>{activeTabContent.content}</pre>
              )}
            </div>
          </div>
        ) : (
          <div className={styles.welcomeScreen}>
            <h2>Welcome to my Portfolio</h2>
            <p>ファイルを選択してコンテンツを表示します</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainEditor;
