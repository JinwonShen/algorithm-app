import Link from "next/link";
import { GetStaticProps } from "next";

type Problem = {
  id: string;
  title: string;
  difficulty: string;
}

export const getStaticProps: GetStaticProps = async () => {
    const res = await fetch('http://localhost:3000/api/problems')
    const problems: Problem[] = await res.json();

    return {
      props: {problems}
    }
}

export default function Home({ problems }: { problems: Problem[] }) {
  return (
    <div>
      <h1>📝 알고리즘 테스트</h1>
      <ul>
        {problems.map((problem) => (
          <li key={problem.id}>
            <Link href={`/problem/${problem.id}`}>
              {problem.title} ({problem.difficulty})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}