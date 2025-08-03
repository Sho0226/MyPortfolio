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

interface Skill {
  id: string;
  name: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  experience: string;
  description: string;
  proficiency: number;
  yearsOfExperience: number;
  acquired: boolean;
  category: string;
  icon: string;
}

const ExtensionsPanel = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [skills, setSkills] = useState<Skill[]>([
    {
      id: "react",
      name: "React",
      level: "Advanced",
      experience: "1.5 years",
      description:
        "Building modern web applications with React and its ecosystem",
      proficiency: 85,
      yearsOfExperience: 1.5,
      acquired: false,
      category: "frontend",
      icon: "⚛️",
    },
    {
      id: "typescript",
      name: "TypeScript",
      level: "Advanced",
      experience: "1.5 years",
      description: "Type-safe JavaScript development for scalable applications",
      proficiency: 85,
      yearsOfExperience: 1.5,
      acquired: false,
      category: "frontend",
      icon: "🔷",
    },
    {
      id: "nextjs",
      name: "Next.js",
      level: "Intermediate",
      experience: "1.5 years",
      description: "Full-stack React framework for production applications",
      proficiency: 75,
      yearsOfExperience: 1.5,
      acquired: false,
      category: "frontend",
      icon: "⚡",
    },
    {
      id: "nodejs",
      name: "Node.js",
      level: "Intermediate",
      experience: "1.5 years",
      description: "Server-side JavaScript development and API creation",
      proficiency: 75,
      yearsOfExperience: 1.5,
      acquired: false,
      category: "backend",
      icon: "🟢",
    },
    {
      id: "css",
      name: "CSS/Sass",
      level: "Intermediate",
      experience: "2 years",
      description: "Modern CSS techniques and responsive design principles",
      proficiency: 70,
      yearsOfExperience: 2,
      acquired: false,
      category: "frontend",
      icon: "🎨",
    },
    {
      id: "git",
      name: "Git",
      level: "Intermediate",
      experience: "2.5 years",
      description: "Version control and collaborative development workflows",
      proficiency: 75,
      yearsOfExperience: 2.5,
      acquired: false,
      category: "tools",
      icon: "🔀",
    },
    {
      id: "docker",
      name: "Docker",
      level: "Intermediate",
      experience: "1.5 years",
      description: "Containerization and deployment optimization",
      proficiency: 70,
      yearsOfExperience: 1.5,
      acquired: false,
      category: "devops",
      icon: "🐳",
    },
    {
      id: "python",
      name: "Python",
      level: "Beginner",
      experience: "1 year",
      description: "Data analysis and automation scripting",
      proficiency: 45,
      yearsOfExperience: 1,
      acquired: false,
      category: "backend",
      icon: "🐍",
    },
  ]);

  const categories = [
    { id: "all", name: "All Skills", count: skills.length },
    {
      id: "acquired",
      name: "Acquired",
      count: skills.filter((s) => s.acquired).length,
    },
    {
      id: "frontend",
      name: "Frontend",
      count: skills.filter((s) => s.category === "frontend").length,
    },
    {
      id: "backend",
      name: "Backend",
      count: skills.filter((s) => s.category === "backend").length,
    },
    {
      id: "tools",
      name: "Tools",
      count: skills.filter((s) => s.category === "tools").length,
    },
    {
      id: "devops",
      name: "DevOps",
      count: skills.filter((s) => s.category === "devops").length,
    },
    {
      id: "cloud",
      name: "Cloud",
      count: skills.filter((s) => s.category === "cloud").length,
    },
  ];

  const toggleAcquired = (skillId: string) => {
    setSkills((prev) =>
      prev.map((skill) =>
        skill.id === skillId ? { ...skill, acquired: !skill.acquired } : skill
      )
    );
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Expert":
        return "#10b981";
      case "Advanced":
        return "#3b82f6";
      case "Intermediate":
        return "#f59e0b";
      case "Beginner":
        return "#ef4444";
      default:
        return "#6b7280";
    }
  };

  const renderProficiencyBar = (proficiency: number) => {
    return (
      <div className={styles.proficiencyBar}>
        <div
          className={styles.proficiencyFill}
          style={{ width: `${proficiency}%` }}
        />
      </div>
    );
  };

  const filteredSkills = skills.filter((skill) => {
    const matchesSearch =
      skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      skill.level.toLowerCase().includes(searchTerm.toLowerCase()) ||
      skill.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" ||
      (selectedCategory === "acquired" && skill.acquired) ||
      skill.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className={styles.extensionsPanel}>
      <div className={styles.header}>
        <span>SKILLS & EXPERTISE</span>
        <button className={styles.refreshButton}>
          <VscRefresh />
        </button>
      </div>

      <div className={styles.searchSection}>
        <div className={styles.searchContainer}>
          <VscSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search Skills and Technologies"
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

      <div className={styles.skillsList}>
        {filteredSkills.map((skill) => (
          <div key={skill.id} className={styles.skillItem}>
            <div className={styles.skillHeader}>
              <div className={styles.skillIcon}>{skill.icon}</div>
              <div className={styles.skillInfo}>
                <div className={styles.skillName}>{skill.name}</div>
                <div className={styles.skillLevel}>
                  <span
                    className={styles.levelBadge}
                    style={{ backgroundColor: getLevelColor(skill.level) }}
                  >
                    {skill.level}
                  </span>
                  <span className={styles.experience}>{skill.experience}</span>
                </div>
              </div>
              <button
                className={`${styles.acquiredButton} ${
                  skill.acquired ? styles.acquired : ""
                }`}
                onClick={() => toggleAcquired(skill.id)}
              >
                {skill.acquired ? (
                  <>
                    <VscCheck /> Acquired
                  </>
                ) : (
                  <>
                    <VscCloudDownload /> Learning
                  </>
                )}
              </button>
            </div>

            <div className={styles.skillDescription}>{skill.description}</div>

            <div className={styles.skillMeta}>
              <div className={styles.proficiencySection}>
                <span className={styles.proficiencyLabel}>Proficiency</span>
                {renderProficiencyBar(skill.proficiency)}
              </div>
              <div className={styles.yearsExperience}>
                {skill.yearsOfExperience}{" "}
                {skill.yearsOfExperience === 1 ? "year" : "years"} experience
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredSkills.length === 0 && (
        <div className={styles.noResults}>
          <VscExtensions className={styles.noResultsIcon} />
          <div className={styles.noResultsText}>No skills found</div>
          <div className={styles.noResultsSubtext}>
            Try adjusting your search terms or category filter
          </div>
        </div>
      )}
    </div>
  );
};

export default ExtensionsPanel;
