"use client";

import { useState } from "react";
import {
  VscSearch,
  VscReplace,
  VscCaseSensitive,
  VscWholeWord,
  VscRegex,
  VscChevronDown,
  VscChevronRight,
} from "react-icons/vsc";
import styles from "./SearchPanel.module.css";

interface SearchResult {
  file: string;
  line: number;
  content: string;
  matches: { start: number; end: number }[];
}

interface SearchPanelProps {
  onFileClick: (fileName: string) => void;
}

const SearchPanel = ({ onFileClick }: SearchPanelProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [replaceTerm, setReplaceTerm] = useState("");
  const [showReplace, setShowReplace] = useState(false);
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [wholeWord, setWholeWord] = useState(false);
  const [useRegex, setUseRegex] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [expandedFiles, setExpandedFiles] = useState<Set<string>>(new Set());

  // ポートフォリオファイルの内容をシミュレート
  const fileContents = {
    "about.md": `# About Me

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
    "skills.json": `{
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
    "contact.ts": `interface Contact {
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
  };

  const performSearch = (term: string) => {
    if (!term.trim()) {
      setSearchResults([]);
      setExpandedFiles(new Set());
      return;
    }

    const results: SearchResult[] = [];
    const searchFlags = caseSensitive ? "g" : "gi";

    Object.entries(fileContents).forEach(([fileName, content]) => {
      const lines = content.split("\n");
      lines.forEach((line, index) => {
        let searchPattern: RegExp;

        try {
          if (useRegex) {
            searchPattern = new RegExp(term, searchFlags);
          } else if (wholeWord) {
            searchPattern = new RegExp(`\\b${term}\\b`, searchFlags);
          } else {
            searchPattern = new RegExp(
              term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
              searchFlags
            );
          }

          const matches = [...line.matchAll(searchPattern)];
          if (matches.length > 0) {
            results.push({
              file: fileName,
              line: index + 1,
              content: line.trim(),
              matches: matches.map((match) => ({
                start: match.index || 0,
                end: (match.index || 0) + match[0].length,
              })),
            });
          }
        } catch {
          // Invalid regex, ignore
        }
      });
    });

    setSearchResults(results);
    // 新しい検索時は全てのファイルグループを展開
    const fileNames = [...new Set(results.map((r) => r.file))];
    setExpandedFiles(new Set(fileNames));
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    performSearch(value);
  };

  const toggleFileGroup = (fileName: string) => {
    setExpandedFiles((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(fileName)) {
        newSet.delete(fileName);
      } else {
        newSet.add(fileName);
      }
      return newSet;
    });
  };

  const highlightMatches = (
    text: string,
    matches: { start: number; end: number }[]
  ) => {
    if (matches.length === 0) return text;

    const result = [];
    let lastIndex = 0;

    matches.forEach((match, index) => {
      result.push(text.slice(lastIndex, match.start));
      result.push(
        <span key={index} className={styles.highlight}>
          {text.slice(match.start, match.end)}
        </span>
      );
      lastIndex = match.end;
    });

    result.push(text.slice(lastIndex));
    return result;
  };

  return (
    <div className={styles.searchPanel}>
      <div className={styles.searchHeader}>
        <span>SEARCH</span>
      </div>

      <div className={styles.searchInputs}>
        <div className={styles.inputContainer}>
          <VscSearch className={styles.inputIcon} />
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            className={styles.searchInput}
          />
          <button
            className={`${styles.toggleButton} ${
              showReplace ? styles.active : ""
            }`}
            onClick={() => setShowReplace(!showReplace)}
            title="Toggle Replace"
          >
            <VscChevronDown />
          </button>
        </div>

        {showReplace && (
          <div className={styles.inputContainer}>
            <VscReplace className={styles.inputIcon} />
            <input
              type="text"
              placeholder="Replace"
              value={replaceTerm}
              onChange={(e) => setReplaceTerm(e.target.value)}
              className={styles.searchInput}
            />
          </div>
        )}

        <div className={styles.searchOptions}>
          <button
            className={`${styles.optionButton} ${
              caseSensitive ? styles.active : ""
            }`}
            onClick={() => setCaseSensitive(!caseSensitive)}
            title="Match Case"
          >
            <VscCaseSensitive />
          </button>
          <button
            className={`${styles.optionButton} ${
              wholeWord ? styles.active : ""
            }`}
            onClick={() => setWholeWord(!wholeWord)}
            title="Match Whole Word"
          >
            <VscWholeWord />
          </button>
          <button
            className={`${styles.optionButton} ${
              useRegex ? styles.active : ""
            }`}
            onClick={() => setUseRegex(!useRegex)}
            title="Use Regular Expression"
          >
            <VscRegex />
          </button>
        </div>
      </div>

      <div className={styles.searchResults}>
        {searchResults.length > 0 && (
          <div className={styles.resultsHeader}>
            {searchResults.length} results in{" "}
            {new Set(searchResults.map((r) => r.file)).size} files
          </div>
        )}

        {Object.entries(
          searchResults.reduce((acc, result) => {
            if (!acc[result.file]) acc[result.file] = [];
            acc[result.file].push(result);
            return acc;
          }, {} as Record<string, SearchResult[]>)
        ).map(([fileName, results]) => {
          const isExpanded = expandedFiles.has(fileName);
          return (
            <div key={fileName} className={styles.fileGroup}>
              <div
                className={styles.fileName}
                onClick={() => toggleFileGroup(fileName)}
              >
                <VscChevronRight
                  className={`${styles.chevron} ${
                    isExpanded ? styles.expanded : styles.collapsed
                  }`}
                />
                {fileName} ({results.length})
              </div>
              {isExpanded && (
                <div className={styles.fileResults}>
                  {results.map((result, index) => (
                    <div
                      key={index}
                      className={styles.searchResult}
                      onClick={() => onFileClick(fileName)}
                    >
                      <span className={styles.lineNumber}>{result.line}</span>
                      <span className={styles.resultContent}>
                        {highlightMatches(result.content, result.matches)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SearchPanel;
