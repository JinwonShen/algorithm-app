import { useEffect, useState } from "react";
import problemsData from '../data/algorithm_problems.json'
import Link from "next/link";
import styles from "../styles/myProblems.module.css"

type Problem = {
  id: string;
  title: string;
  difficulty: string;
  category: string;
}

export default function MyProblems() {
  const [solvedProblems, setSolvedProblems] = useState<Problem[]>([]);

  useEffect(() => {
    const solved = localStorage.getItem('solvedProblems');
    
    if(solved) {
      const solvedIds = JSON.parse(solved) as string[]
      const solvedList = problemsData.filter((problem) => solvedIds.includes(problem.id))
      setSolvedProblems(solvedList)
    }
  }, [])

  return (
    <div className="wrap">
      <div className={styles.headerContainer}>
        <Link href="/">
          <h1 className={styles.title}>AlgoNote</h1>
        </Link>
        <div className={styles.buttonContainer}>
          <Link href="/editor">
            <button className={styles.editorButton}>🧑‍💻 코드 에디터</button>
          </Link>
        </div>
      </div>
      
      <h1 className={styles.myProblemsTitle}>📜 내가 푼 문제</h1>
      {solvedProblems.length === 0 ? (
        <p>아직 푼 문제가 없어요 ! 문제를 풀어보세요. 💪</p>
      ) : (
        <ul className={styles.problemListContainer}>
          {solvedProblems.map((problem) => (
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
      )}

      <Link href={"/"}>
        <button className={styles.homeButton}>🏠 홈으로 돌아가기</button>
      </Link>
    </div>
  )
}