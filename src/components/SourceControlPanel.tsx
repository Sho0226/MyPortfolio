"use client";

import { useState, useEffect, useCallback } from "react";
import {
  VscSourceControl,
  VscGitCommit,
  VscRefresh,
  VscAccount,
  VscRepo,
  VscFolder,
} from "react-icons/vsc";
import styles from "./SourceControlPanel.module.css";

interface GitCommit {
  sha: string;
  commit: {
    message: string;
    author: {
      name: string;
      email: string;
      date: string;
    };
  };
  author?: {
    login: string;
    avatar_url: string;
  };
}

const SourceControlPanel = () => {
  const [commits, setCommits] = useState<GitCommit[]>([]);
  const [currentBranch] = useState("main");
  const [loading, setLoading] = useState(false);
  const [repoInfo, setRepoInfo] = useState<{
    name: string;
    owner: string;
    url: string;
  } | null>(null);

  // GitHub API設定（パブリックリポジトリの場合）
  const GITHUB_API_BASE = "https://api.github.com";

  // 実際のリポジトリ情報を取得（環境変数から設定可能）
  const getRepoInfo = () => {
    // 実際のプロジェクトの場合は環境変数から取得
    const owner = process.env.NEXT_PUBLIC_GITHUB_OWNER || "yourusername";
    const repo = process.env.NEXT_PUBLIC_GITHUB_REPO || "portfolio";
    return { owner, repo };
  };

  const fetchCommits = useCallback(async (branch = "main") => {
    setLoading(true);
    try {
      const { owner, repo } = getRepoInfo();
      const response = await fetch(
        `${GITHUB_API_BASE}/repos/${owner}/${repo}/commits?sha=${branch}&per_page=20`
      );

      if (response.ok) {
        const data = await response.json();
        setCommits(data);
        setRepoInfo({
          name: repo,
          owner,
          url: `https://github.com/${owner}/${repo}`,
        });
      } else {
        // APIエラーの場合、デモデータを使用
        setCommits(getDemoCommits());
        setRepoInfo({ name: "portfolio", owner: "demo", url: "#" });
      }
    } catch {
      console.log("GitHub API unavailable, using demo data");
      setCommits(getDemoCommits());
      setRepoInfo({ name: "portfolio", owner: "demo", url: "#" });
    }
    setLoading(false);
  }, []);

  const getDemoCommits = (): GitCommit[] => [
    {
      sha: "f58491b",
      commit: {
        message: "Create nextjs.yml",
        author: {
          name: "Developer",
          email: "dev@example.com",
          date: "2024-01-15T10:30:00Z",
        },
      },
      author: {
        login: "developer",
        avatar_url: "https://github.com/github.png",
      },
    },
    {
      sha: "ce22c9f",
      commit: {
        message: "ignoreに.vscode追加",
        author: {
          name: "Developer",
          email: "dev@example.com",
          date: "2024-01-14T14:20:00Z",
        },
      },
      author: {
        login: "developer",
        avatar_url: "https://github.com/github.png",
      },
    },
    {
      sha: "18efd92",
      commit: {
        message: "Initial commit from Create Next App",
        author: {
          name: "Developer",
          email: "dev@example.com",
          date: "2024-01-14T09:15:00Z",
        },
      },
      author: {
        login: "developer",
        avatar_url: "https://github.com/github.png",
      },
    },
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ja-JP", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatCommitMessage = (message: string) => {
    return message.split("\n")[0]; // 最初の行のみ表示
  };

  useEffect(() => {
    fetchCommits(currentBranch);
  }, [currentBranch, fetchCommits]);

  return (
    <div className={styles.sourceControlPanel}>
      <div className={styles.header}>
        <span>SOURCE CONTROL</span>
        <button
          className={styles.refreshButton}
          onClick={() => fetchCommits(currentBranch)}
          disabled={loading}
        >
          <VscRefresh />
        </button>
      </div>

      <div className={styles.repoInfo}>
        {repoInfo && (
          <div className={styles.repoHeader}>
            <VscSourceControl className={styles.repoIcon} />
            <div className={styles.repoDetails}>
              <div className={styles.repoName}>{repoInfo.name}</div>
              <div className={styles.repoOwner}>{repoInfo.owner}</div>
            </div>
          </div>
        )}

        <div className={styles.branchInfo}>
          <VscFolder className={styles.branchIcon} />
          <span className={styles.branchName}>{currentBranch}</span>
          <VscRepo className={styles.syncIcon} />
        </div>
      </div>

      <div className={styles.commitList}>
        <div className={styles.sectionHeader}>
          <VscGitCommit className={styles.sectionIcon} />
          <span>Commits ({commits.length})</span>
        </div>

        {loading ? (
          <div className={styles.loading}>Loading commits...</div>
        ) : (
          commits.map((commit) => (
            <div key={commit.sha} className={styles.commitItem}>
              <div className={styles.commitHeader}>
                <div className={styles.commitAuthor}>
                  {commit.author?.avatar_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={commit.author.avatar_url}
                      alt={commit.author.login}
                      className={styles.avatar}
                    />
                  ) : (
                    <VscAccount className={styles.avatarIcon} />
                  )}
                  <span className={styles.authorName}>
                    {commit.author?.login || commit.commit.author.name}
                  </span>
                </div>
                <span className={styles.commitDate}>
                  {formatDate(commit.commit.author.date)}
                </span>
              </div>
              <div className={styles.commitMessage}>
                {formatCommitMessage(commit.commit.message)}
              </div>
              <div className={styles.commitSha}>
                {commit.sha.substring(0, 7)}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SourceControlPanel;
