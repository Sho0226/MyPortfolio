"use client";

import { useState } from "react";
import {
  VscExtensions,
  VscSearch,
  VscCloudDownload,
  VscCheck,
  VscStarFull,
  VscStarEmpty,
  VscAccount,
  VscRefresh,
} from "react-icons/vsc";
import styles from "./ExtensionsPanel.module.css";

interface Extension {
  id: string;
  name: string;
  publisher: string;
  description: string;
  version: string;
  downloads: number;
  rating: number;
  installed: boolean;
  category: string;
  icon: string;
}

const ExtensionsPanel = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [extensions, setExtensions] = useState<Extension[]>([
    {
      id: "portfolio-theme",
      name: "Portfolio Dark Theme",
      publisher: "PortfolioDev",
      description: "A beautiful dark theme optimized for portfolio development",
      version: "1.2.0",
      downloads: 125000,
      rating: 4.8,
      installed: true,
      category: "themes",
      icon: "🎨",
    },
    {
      id: "react-snippets",
      name: "React Snippets Pro",
      publisher: "ReactTeam",
      description:
        "Essential React and TypeScript code snippets for faster development",
      version: "2.1.5",
      downloads: 890000,
      rating: 4.9,
      installed: true,
      category: "snippets",
      icon: "⚛️",
    },
    {
      id: "tailwind-intellisense",
      name: "Tailwind CSS IntelliSense",
      publisher: "TailwindLabs",
      description: "Intelligent Tailwind CSS class name completion and linting",
      version: "0.9.1",
      downloads: 2100000,
      rating: 4.7,
      installed: false,
      category: "language-support",
      icon: "🎯",
    },
    {
      id: "git-lens",
      name: "GitLens — Git supercharged",
      publisher: "GitKraken",
      description:
        "Supercharge Git within VS Code and unlock untapped knowledge",
      version: "13.6.0",
      downloads: 15000000,
      rating: 4.8,
      installed: true,
      category: "source-control",
      icon: "🔍",
    },
    {
      id: "prettier",
      name: "Prettier - Code formatter",
      publisher: "Prettier",
      description: "Code formatter using prettier for consistent code style",
      version: "9.10.4",
      downloads: 28000000,
      rating: 4.6,
      installed: true,
      category: "formatters",
      icon: "💅",
    },
    {
      id: "portfolio-live-server",
      name: "Live Server",
      publisher: "ritwickdey",
      description: "Launch a development local Server with live reload feature",
      version: "5.7.9",
      downloads: 45000000,
      rating: 4.5,
      installed: false,
      category: "other",
      icon: "🚀",
    },
    {
      id: "material-icons",
      name: "Material Icon Theme",
      publisher: "PKief",
      description: "Material Design Icons for Visual Studio Code",
      version: "4.28.0",
      downloads: 8500000,
      rating: 4.9,
      installed: false,
      category: "themes",
      icon: "📁",
    },
    {
      id: "auto-rename-tag",
      name: "Auto Rename Tag",
      publisher: "formulahendry",
      description: "Auto rename paired HTML/XML tag",
      version: "0.1.10",
      downloads: 6200000,
      rating: 4.4,
      installed: false,
      category: "language-support",
      icon: "🏷️",
    },
  ]);

  const categories = [
    { id: "all", name: "All", count: extensions.length },
    {
      id: "installed",
      name: "Installed",
      count: extensions.filter((e) => e.installed).length,
    },
    {
      id: "themes",
      name: "Themes",
      count: extensions.filter((e) => e.category === "themes").length,
    },
    {
      id: "snippets",
      name: "Snippets",
      count: extensions.filter((e) => e.category === "snippets").length,
    },
    {
      id: "language-support",
      name: "Language Support",
      count: extensions.filter((e) => e.category === "language-support").length,
    },
    {
      id: "formatters",
      name: "Formatters",
      count: extensions.filter((e) => e.category === "formatters").length,
    },
    {
      id: "source-control",
      name: "Source Control",
      count: extensions.filter((e) => e.category === "source-control").length,
    },
    {
      id: "other",
      name: "Other",
      count: extensions.filter((e) => e.category === "other").length,
    },
  ];

  const toggleInstall = (extensionId: string) => {
    setExtensions((prev) =>
      prev.map((ext) =>
        ext.id === extensionId ? { ...ext, installed: !ext.installed } : ext
      )
    );
  };

  const formatDownloads = (downloads: number) => {
    if (downloads >= 1000000) {
      return `${(downloads / 1000000).toFixed(1)}M`;
    } else if (downloads >= 1000) {
      return `${(downloads / 1000).toFixed(0)}K`;
    }
    return downloads.toString();
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<VscStarFull key={i} className={styles.starFilled} />);
    }

    if (hasHalfStar) {
      stars.push(<VscStarFull key="half" className={styles.starHalf} />);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <VscStarEmpty key={`empty-${i}`} className={styles.starEmpty} />
      );
    }

    return stars;
  };

  const filteredExtensions = extensions.filter((ext) => {
    const matchesSearch =
      ext.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ext.publisher.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ext.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" ||
      (selectedCategory === "installed" && ext.installed) ||
      ext.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className={styles.extensionsPanel}>
      <div className={styles.header}>
        <span>EXTENSIONS</span>
        <button className={styles.refreshButton}>
          <VscRefresh />
        </button>
      </div>

      <div className={styles.searchSection}>
        <div className={styles.searchContainer}>
          <VscSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search Extensions in Marketplace"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>
      </div>

      <div className={styles.categories}>
        {categories.map((category) => (
          <button
            key={category.id}
            className={`${styles.categoryButton} ${
              selectedCategory === category.id ? styles.active : ""
            }`}
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.name} ({category.count})
          </button>
        ))}
      </div>

      <div className={styles.extensionsList}>
        {filteredExtensions.map((extension) => (
          <div key={extension.id} className={styles.extensionItem}>
            <div className={styles.extensionHeader}>
              <div className={styles.extensionIcon}>{extension.icon}</div>
              <div className={styles.extensionInfo}>
                <div className={styles.extensionName}>{extension.name}</div>
                <div className={styles.extensionPublisher}>
                  <VscAccount className={styles.publisherIcon} />
                  {extension.publisher}
                </div>
              </div>
              <button
                className={`${styles.installButton} ${
                  extension.installed ? styles.installed : ""
                }`}
                onClick={() => toggleInstall(extension.id)}
              >
                {extension.installed ? (
                  <>
                    <VscCheck /> Installed
                  </>
                ) : (
                  <>
                    <VscCloudDownload /> Install
                  </>
                )}
              </button>
            </div>

            <div className={styles.extensionDescription}>
              {extension.description}
            </div>

            <div className={styles.extensionMeta}>
              <div className={styles.rating}>
                {renderStars(extension.rating)}
                <span className={styles.ratingText}>({extension.rating})</span>
              </div>
              <div className={styles.downloads}>
                <VscCloudDownload className={styles.downloadIcon} />
                {formatDownloads(extension.downloads)}
              </div>
              <div className={styles.version}>v{extension.version}</div>
            </div>
          </div>
        ))}
      </div>

      {filteredExtensions.length === 0 && (
        <div className={styles.noResults}>
          <VscExtensions className={styles.noResultsIcon} />
          <div className={styles.noResultsText}>No extensions found</div>
          <div className={styles.noResultsSubtext}>
            Try adjusting your search terms or category filter
          </div>
        </div>
      )}
    </div>
  );
};

export default ExtensionsPanel;
