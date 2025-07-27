'use client';

import { useState } from 'react';
import TabBar from './TabBar';
import styles from './MainEditor.module.css';

interface Tab {
  id: string;
  name: string;
  content: string;
  language: string;
}

const MainEditor = () => {
  const [tabs, setTabs] = useState<Tab[]>([
    {
      id: 'about',
      name: 'about.md',
      language: 'markdown',
      content: `# About Me

こんにちは！私はフロントエンド開発者です。

## スキル
- React / Next.js
- TypeScript
- CSS / Sass
- Node.js

## 経験
- Webアプリケーション開発
- レスポンシブデザイン
- パフォーマンス最適化`
    },
    {
      id: 'skills',
      name: 'skills.json',
      language: 'json',
      content: `{
  "frontend": [
    "React",
    "Next.js",
    "TypeScript",
    "Vue.js"
  ],
  "backend": [
    "Node.js",
    "Express",
    "Python",
    "Django"
  ],
  "tools": [
    "Git",
    "Docker",
    "AWS",
    "Figma"
  ]
}`
    }
  ]);
  
  const [activeTab, setActiveTab] = useState('about');

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
  };

  const handleTabClose = (tabId: string) => {
    const newTabs = tabs.filter(tab => tab.id !== tabId);
    setTabs(newTabs);
    
    if (activeTab === tabId && newTabs.length > 0) {
      setActiveTab(newTabs[0].id);
    }
  };

  const activeTabContent = tabs.find(tab => tab.id === activeTab);

  return (
    <div className={styles.mainEditor}>
      <TabBar
        tabs={tabs}
        activeTab={activeTab}
        onTabClick={handleTabClick}
        onTabClose={handleTabClose}
      />
      <div className={styles.editorArea}>
        {activeTabContent ? (
          <div className={styles.editorContent}>
            <div className={styles.lineNumbers}>
              {activeTabContent.content.split('\n').map((_, index) => (
                <div key={index + 1} className={styles.lineNumber}>
                  {index + 1}
                </div>
              ))}
            </div>
            <div className={styles.codeArea}>
              <pre className={styles.code}>
                {activeTabContent.content}
              </pre>
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