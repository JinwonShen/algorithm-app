import { useState } from "react";
import problemsData from "../data/algorithm_problems.json";
import Link from "next/link";
import styles from "../styles/index.module.css"

type Problem = {
  id: string;
  title: string;
  category: string;
  difficulty: string;
};

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("default");
  const [selectedCategory, setSelectedCategory] = useState("전체");

  const filteredProblems = problemsData
    .filter((problem) => {
      const matchesSearch = (problem.title + " " + problem.category)
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "전체" || problem.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a: Problem, b: Problem): number => {
  if (sortOption === "title") {
    return a.title.localeCompare(b.title);
  } else if (sortOption === "difficulty") {
    const difficultyOrder: Record<Problem["difficulty"], number> = {
      Easy: 1,
      Medium: 2,
      Hard: 3,
    };
    return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
  }
  return 0;
}).sort((a: Problem, b: Problem): number => {
  if (sortOption === "title") {
    return a.title.localeCompare(b.title);
  } else if (sortOption === "difficulty") {
    const difficultyOrder: Record<Problem["difficulty"], number> = {
      Easy: 1,
      Medium: 2,
      Hard: 3,
    };
    return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
  }
  return 0;
})

  return (
    <div className="wrap">
      <h1 className={styles.title}>AlgoNote</h1>

      <input
        type="text"
        placeholder="문제 제목이나 카테고리를 입력하세요"
        className={styles.searchInput}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className={styles.filterContainer}>
          <div className={styles.filterSort}>
            <label>정렬 :</label>
            <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
              <option value="default">기본순</option>
              <option value="title">제목순</option>
              <option value="difficulty">난이도순</option>
            </select>
          </div>
            
          <div className={styles.filterCategory}>
            <label>카테고리 :</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="전체">전체</option>
              {/* 중복 제거된 카테고리 자동 생성 */}
              {[...new Set(problemsData.map((p) => p.category))].map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

      <ul className={styles.problemListContainer}>
        {filteredProblems.map((problem: Problem) => (
          <li key={problem.id}>
            <Link href={`/problem/${problem.id}`} className={styles.problemListItem}>
              <div className={styles.problemInfo}>
                <div className={styles.problemTitle}>{problem.title}</div> 
                <div className={styles.problemCategory}>{problem.category}</div> 
              </div>
              <div className={`${styles.problemDifficulty} ${problem.difficulty === "Easy" ? styles.easy : problem.difficulty === "Medium" ? styles.medium : styles.hard}`}>{problem.difficulty}</div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}