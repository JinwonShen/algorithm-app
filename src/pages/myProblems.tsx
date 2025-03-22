import { useEffect, useState } from "react";
import problemsData from '../data/algorithm_problems.json'
import Link from "next/link";

type Problem = {
  id: string;
  title: string;
  difficulty: string;
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
    <div>
      <h1>📜 내가 푼 문제</h1>
      {solvedProblems.length === 0 ? (
        <p>아직 푼 문제가 없어요 ! 문제를 풀어보세요. 💪</p>
      ) : (
        <ul>
          {solvedProblems.map((problem) => (
            <li key={problem.id}>
              <Link href={`/problem/${problem.id}`}>
                <strong>{problem.title}</strong> - 난이도: {problem.difficulty}
              </Link>
            </li>
          ))}
        </ul>
      )}

      <br />
      <Link href={"/"}>🏠 홈으로 돌아가기</Link>
    </div>
  )
}