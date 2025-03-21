import { useRouter } from "next/router";
import { GetStaticProps, GetStaticPaths } from "next";
import problemsData from '../../data/algorithm_problems.json';

type Problem = {
  id: string;
  title: string;
  difficulty: string;
  description?: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = problemsData.map((problem) => ({
    params: { id: problem.id }
  }))

  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const problem = problemsData.find((p) => p.id === params?.id)

  if (!problem) {
    return {notFound: true};
  }

  return { props: {problem} }
}

export default function ProblemDetail({ problem }: { problem: Problem }) {
  const router = useRouter()

  return (
    <div>
      <h1>{problem.title}</h1>
      <p>난이도: {problem.difficulty}</p>
      <p>{problem.description || "문제 설명이 없습니다."}</p>
      <button onClick={() => router.push('/')}>홈으로 돌아가기</button>
    </div>
  )
}