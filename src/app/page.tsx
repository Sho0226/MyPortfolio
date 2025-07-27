"use client";

import { useState } from "react";
import ActivityBar from "@/components/ActivityBar";
import Sidebar from "@/components/Sidebar";
import SearchPanel from "@/components/SearchPanel";
import SourceControlPanel from "@/components/SourceControlPanel";
import ExtensionsPanel from "@/components/ExtensionsPanel";
import MainEditor from "@/components/MainEditor";
import styles from "./page.module.css";

interface Tab {
  id: string;
  name: string;
  content: string;
  language: string;
}

interface FileContent {
  [key: string]: {
    content: string;
    language: string;
  };
}

export default function Home() {
  const [tabs, setTabs] = useState<Tab[]>([
    {
      id: "about.md",
      name: "about.md",
      language: "markdown",
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
- パフォーマンス最適化`,
    },
  ]);

  const [activeTab, setActiveTab] = useState("about.md");
  const [activeActivity, setActiveActivity] = useState("explorer");
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(
    new Set(["projects"])
  );

  const fileContents: FileContent = {
    "about.md": {
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
- パフォーマンス最適化`,
      language: "markdown",
    },
    "skills.json": {
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
}`,
      language: "json",
    },
    "contact.ts": {
      content: `interface Contact {
  email: string;
  github: string;
  linkedin: string;
  twitter: string;
}

const contact: Contact = {
  email: "your.email@example.com",
  github: "https://github.com/yourusername",
  linkedin: "https://linkedin.com/in/yourusername",
  twitter: "https://twitter.com/yourusername"
};

export default contact;`,
      language: "typescript",
    },
    "project1.tsx": {
      content: `import React from 'react';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  demoUrl?: string;
}

const Project1: React.FC = () => {
  const project: Project = {
    title: "E-commerce Website",
    description: "React/Next.jsで構築したECサイト",
    technologies: ["React", "Next.js", "TypeScript", "Stripe"],
    githubUrl: "https://github.com/yourusername/ecommerce",
    demoUrl: "https://ecommerce-demo.vercel.app"
  };

  return (
    <div>
      <h2>{project.title}</h2>
      <p>{project.description}</p>
      <ul>
        {project.technologies.map(tech => (
          <li key={tech}>{tech}</li>
        ))}
      </ul>
    </div>
  );
};

export default Project1;`,
      language: "typescript",
    },
    "project2.tsx": {
      content: `import React from 'react';

const Project2: React.FC = () => {
  return (
    <div>
      <h2>Todo App</h2>
      <p>シンプルなタスク管理アプリケーション</p>
      <ul>
        <li>React Hooks</li>
        <li>Local Storage</li>
        <li>CSS Modules</li>
      </ul>
    </div>
  );
};

export default Project2;`,
      language: "typescript",
    },
    "project3.tsx": {
      content: `import React from 'react';

const Project3: React.FC = () => {
  return (
    <div>
      <h2>Weather App</h2>
      <p>天気予報を表示するWebアプリ</p>
      <ul>
        <li>API Integration</li>
        <li>Responsive Design</li>
        <li>PWA</li>
      </ul>
    </div>
  );
};

export default Project3;`,
      language: "typescript",
    },
  };

  const handleFileClick = (fileName: string, options?: { fromSearch?: boolean; switchToExplorer?: boolean }) => {
    const fileContent = fileContents[fileName];
    if (!fileContent) return;

    // 検索からのクリックの場合、必要なフォルダを開く（ビュー切り替えは制御可能）
    if (options?.fromSearch) {
      // projects内のファイルの場合、projectsフォルダを開く
      if (fileName.startsWith("project")) {
        setExpandedFolders(prev => new Set([...prev, "projects"]));
      }
      // switchToExplorerが明示的にtrueの場合のみExplorerに切り替え
      if (options.switchToExplorer) {
        setActiveActivity("explorer");
      }
    }

    // 既にタブが開いているかチェック
    const existingTab = tabs.find((tab) => tab.id === fileName);
    if (existingTab) {
      setActiveTab(fileName);
      return;
    }

    // 新しいタブを追加
    const newTab: Tab = {
      id: fileName,
      name: fileName,
      content: fileContent.content,
      language: fileContent.language,
    };

    setTabs((prevTabs) => [...prevTabs, newTab]);
    setActiveTab(fileName);
  };

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
  };

  const handleTabClose = (tabId: string) => {
    const newTabs = tabs.filter((tab) => tab.id !== tabId);
    setTabs(newTabs);

    if (activeTab === tabId && newTabs.length > 0) {
      setActiveTab(newTabs[0].id);
    } else if (newTabs.length === 0) {
      setActiveTab("");
    }
  };

  const handleActivityChange = (activity: string) => {
    setActiveActivity(activity);
  };

  return (
    <div className={styles.vscodeLayout}>
      <ActivityBar
        activeActivity={activeActivity}
        onActivityChange={handleActivityChange}
      />
      {activeActivity === "explorer" && (
        <Sidebar 
          onFileClick={handleFileClick} 
          expandedFolders={expandedFolders}
          setExpandedFolders={setExpandedFolders}
        />
      )}
      {activeActivity === "search" && (
        <SearchPanel onFileClick={(fileName) => handleFileClick(fileName, { fromSearch: true })} />
      )}
      {activeActivity === "source-control" && (
        <SourceControlPanel />
      )}
      {activeActivity === "extensions" && (
        <ExtensionsPanel />
      )}
      <MainEditor
        tabs={tabs}
        activeTab={activeTab}
        onTabClick={handleTabClick}
        onTabClose={handleTabClose}
      />
    </div>
  );
}
